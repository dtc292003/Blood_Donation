import express from "express";
import user from "../controllers/user.controller";
import { verifySession, verifyOwnerOrAdmin, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/user/:id").get(verifySession, verifyOwnerOrAdmin, user.getId);
router.route("/user").get(verifySession, requireAdmin, user.getAll);
router.route("/user").post(verifySession, requireAdmin, user.add);
router.route("/user/:id").put(verifySession, verifyOwnerOrAdmin, user.update);
router.route("/user/:id").delete(verifySession, verifyOwnerOrAdmin, user.delete);

module.exports = router;