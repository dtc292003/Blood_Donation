import express from "express";
import report from "../controllers/report.controller";
import { verifySession, verifyOwnerOrAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

// Public
router.route("/report/stats/donation").get(report.getDonationStats);
router.route("/report/stats/bloodType").get(report.getBloodTypeDistribution);
router.route("/report/stats/requestStatus").get(report.getRequestStatusStats);
router.route("/report/stats/topDonors").get(report.getTopDonors);

// Protected
router.route("/report/generate").post(verifySession, report.generateReport);
router.route("/report/user/:userId").get(verifySession, verifyOwnerOrAdmin, report.getByUser);


router.route("/report/:id").get(verifySession, report.getId);
router.route("/report").get(verifySession, report.getAll);
router.route("/report").post(verifySession, report.add);
router.route("/report/:id").put(verifySession, report.update);
router.route("/report/:id").delete(verifySession, report.delete);

module.exports = router;