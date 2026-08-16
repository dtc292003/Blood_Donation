import express from "express";
import role from "../controllers/role.controller";
import { verifySession, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/role/:id").get(role.getId);
router.route("/role").get(role.getAll);
router.route("/role").post(verifySession, requireAdmin, role.add);
router.route("/role/:id").put(verifySession, requireAdmin, role.update);
router.route("/role/:id").delete(verifySession, requireAdmin, role.delete);

module.exports = router;