import express from "express";
import donation from "../controllers/donation.controller";
import { verifySession, verifyOwnerOrAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/donation/user/:userId").get(verifySession, verifyOwnerOrAdmin, donation.getByUser);
router.route("/donation/:id").get(verifySession, donation.getId);
router.route("/donation").get(verifySession, donation.getAll);
router.route("/donation").post(verifySession, donation.add);
router.route("/donation/:id").put(verifySession, donation.update);
router.route("/donation/:id").delete(verifySession, donation.delete);

module.exports = router;