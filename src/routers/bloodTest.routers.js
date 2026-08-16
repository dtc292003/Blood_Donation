import express from "express";
import bloodTest from "../controllers/bloodTest.controller";
import { verifySession, verifyOwnerViaQuery, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

const verifyBloodTestOwner = verifyOwnerViaQuery(
  `SELECT d.USERID FROM BLOOD_TEST bt
   JOIN DONATION d ON bt.DONATIONID = d.DONATIONID
   WHERE bt.TESTID = ?`
);

const verifyDonationOwnerByParam = verifyOwnerViaQuery(
  `SELECT USERID FROM DONATION WHERE DONATIONID = ?`,
  "donationId"
);

router.route("/bloodTest/donation/:donationId").get(verifySession, verifyDonationOwnerByParam, bloodTest.getByDonation);
router.route("/bloodTest/:id").get(verifySession, verifyBloodTestOwner, bloodTest.getId);
router.route("/bloodTest").get(verifySession, requireAdmin, bloodTest.getAll);
router.route("/bloodTest").post(verifySession, requireAdmin, bloodTest.add);
router.route("/bloodTest/:id").put(verifySession, requireAdmin, bloodTest.update);
router.route("/bloodTest/:id").delete(verifySession, requireAdmin, bloodTest.delete);

module.exports = router;