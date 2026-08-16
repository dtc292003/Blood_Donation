import express from "express";
import donation from "../controllers/donation.controller";
import { verifySession, verifyOwnerOrAdmin, verifyOwnerViaQuery, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

const verifyDonationOwner = verifyOwnerViaQuery(`SELECT USERID FROM DONATION WHERE DONATIONID = ?`);

router.route("/donation/user/:userId").get(verifySession, verifyOwnerOrAdmin, donation.getByUser);
router.route("/donation/:id").get(verifySession, verifyDonationOwner, donation.getId);
router.route("/donation").get(verifySession, requireAdmin, donation.getAll);
router.route("/donation").post(verifySession, requireAdmin, donation.add);
router.route("/donation/:id").put(verifySession, requireAdmin, donation.update);
router.route("/donation/:id").delete(verifySession, requireAdmin, donation.delete);

module.exports = router;