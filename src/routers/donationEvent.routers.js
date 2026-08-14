import express from "express";
import donationEvent from "../controllers/donationEvent.controller";

const router = express.Router();

router.route("/donationEvent/:id").get(donationEvent.getId);
router.route("/donationEvent").get(donationEvent.getAll);
router.route("/donationEvent").post(donationEvent.add);
router.route("/donationEvent/:id").put(donationEvent.update);
router.route("/donationEvent/:id").delete(donationEvent.delete);

module.exports = router;