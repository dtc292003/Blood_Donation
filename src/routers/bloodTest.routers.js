import express from "express";
import bloodTest from "../controllers/bloodTest.controller";

const router = express.Router();

router.route("/bloodTest/donation/:donationId").get(bloodTest.getByDonation);
router.route("/bloodTest/:id").get(bloodTest.getId);
router.route("/bloodTest").get(bloodTest.getAll);
router.route("/bloodTest").post(bloodTest.add);
router.route("/bloodTest/:id").put(bloodTest.update);
router.route("/bloodTest/:id").delete(bloodTest.delete);

module.exports = router;