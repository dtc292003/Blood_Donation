import express from "express";
import report from "../controllers/report.controller";
import { verifySession, verifyOwnerOrAdmin, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/report/stats/donation").get(report.getDonationStats);
router.route("/report/stats/bloodType").get(report.getBloodTypeDistribution);
router.route("/report/stats/requestStatus").get(report.getRequestStatusStats);
router.route("/report/stats/topDonors").get(report.getTopDonors);

router.route("/report/generate").post(verifySession, requireAdmin, report.generateReport);
router.route("/report/user/:userId").get(verifySession, verifyOwnerOrAdmin, report.getByUser);

router.route("/report/:id").get(verifySession, requireAdmin, report.getId);
router.route("/report").get(verifySession, requireAdmin, report.getAll);
router.route("/report").post(verifySession, requireAdmin, report.add);
router.route("/report/:id").put(verifySession, requireAdmin, report.update);
router.route("/report/:id").delete(verifySession, requireAdmin, report.delete);

module.exports = router;