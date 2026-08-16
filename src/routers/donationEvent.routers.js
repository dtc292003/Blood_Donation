import express from "express";
import donationEvent from "../controllers/donationEvent.controller";
import { verifySession, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/donationEvent/:id").get(donationEvent.getId);
router.route("/donationEvent").get(donationEvent.getAll);
router.route("/donationEvent").post(verifySession, requireAdmin, donationEvent.add);
router.route("/donationEvent/:id").put(verifySession, requireAdmin, donationEvent.update);
router.route("/donationEvent/:id").delete(verifySession, requireAdmin, donationEvent.delete);

module.exports = router;