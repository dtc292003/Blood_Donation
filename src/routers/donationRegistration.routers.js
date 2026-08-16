import express from "express";
import donationRegistration from "../controllers/donationRegistration.controller";
import { verifySession, verifyOwnerViaQuery, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

const verifyRegistrationOwner = verifyOwnerViaQuery(
  `SELECT d.USERID FROM DONATION_REGISTRATION dr
   JOIN DONOR d ON dr.DONORID = d.DONORID
   WHERE dr.REGISTRATIONID = ?`
);

router.route("/donationRegistration/event/:eventId").get(verifySession, donationRegistration.getByEvent);
router.route("/donationRegistration/:id").get(verifySession, verifyRegistrationOwner, donationRegistration.getId);
router.route("/donationRegistration").get(verifySession, requireAdmin, donationRegistration.getAll);
router.route("/donationRegistration").post(verifySession, donationRegistration.add);
router.route("/donationRegistration/:id").put(verifySession, verifyRegistrationOwner, donationRegistration.update);
router.route("/donationRegistration/:id").delete(verifySession, verifyRegistrationOwner, donationRegistration.delete);

module.exports = router;