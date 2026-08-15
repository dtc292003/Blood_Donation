import express from "express";
import userRole from "../controllers/userRole.controller";
import { verifySession, verifyOwnerOrAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/userRole/user/:userId").get(verifySession, verifyOwnerOrAdmin, userRole.getRolesByUser);
router.route("/userRole/role/:roleId").get(verifySession, userRole.getUsersByRole);
router.route("/userRole").get(verifySession, userRole.getAll);
router.route("/userRole/assign").post(verifySession, userRole.assignRole);
router.route("/userRole/remove").delete(verifySession, userRole.removeRole);
router.route("/userRole/:id").delete(verifySession, userRole.delete);

module.exports = router;