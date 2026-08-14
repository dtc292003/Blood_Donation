import express from "express";
import donationRegistration from "../controllers/donationRegistration.controller";

const router = express.Router();

router.route("/donationRegistration/event/:eventId").get(donationRegistration.getByEvent);
router.route("/donationRegistration/:id").get(donationRegistration.getId);
router.route("/donationRegistration").get(donationRegistration.getAll);
router.route("/donationRegistration").post(donationRegistration.add);
router.route("/donationRegistration/:id").put(donationRegistration.update);
router.route("/donationRegistration/:id").delete(donationRegistration.delete);

module.exports = router;