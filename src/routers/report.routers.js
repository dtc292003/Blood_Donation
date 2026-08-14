import express from "express";
import report from "../controllers/report.controller";

const router = express.Router();

// Nâng cao — đặt trước /:id
router.route("/report/stats/donation").get(report.getDonationStats);
router.route("/report/stats/bloodType").get(report.getBloodTypeDistribution);
router.route("/report/stats/requestStatus").get(report.getRequestStatusStats);
router.route("/report/stats/topDonors").get(report.getTopDonors);
router.route("/report/generate").post(report.generateReport);
router.route("/report/user/:userId").get(report.getByUser);

// CRUD cơ bản
router.route("/report/:id").get(report.getId);
router.route("/report").get(report.getAll);
router.route("/report").post(report.add);
router.route("/report/:id").put(report.update);
router.route("/report/:id").delete(report.delete);

module.exports = router;