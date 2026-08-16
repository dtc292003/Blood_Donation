import express from "express";
import userRole from "../controllers/userRole.controller";
import { verifySession, verifyOwnerOrAdmin, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/userRole/user/:userId").get(verifySession, verifyOwnerOrAdmin, userRole.getRolesByUser);
router.route("/userRole/role/:roleId").get(verifySession, requireAdmin, userRole.getUsersByRole);
router.route("/userRole").get(verifySession, requireAdmin, userRole.getAll);
router.route("/userRole/assign").post(verifySession, requireAdmin, userRole.assignRole);
router.route("/userRole/remove").delete(verifySession, requireAdmin, userRole.removeRole);
router.route("/userRole/:id").delete(verifySession, requireAdmin, userRole.delete);

module.exports = router;