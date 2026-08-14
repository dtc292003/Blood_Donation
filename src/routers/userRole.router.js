import express from "express";
import userRole from "../controllers/userRole.controller";

const router = express.Router();

router.route("/userRole/user/:userId").get(userRole.getRolesByUser);
router.route("/userRole/role/:roleId").get(userRole.getUsersByRole);
router.route("/userRole").get(userRole.getAll);
router.route("/userRole/assign").post(userRole.assignRole);
router.route("/userRole/remove").delete(userRole.removeRole);
router.route("/userRole/:id").delete(userRole.delete);

module.exports = router;