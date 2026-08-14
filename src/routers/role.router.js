import express from "express";
import role from "../controllers/role.controller";

const router = express.Router();

router.route("/role/:id").get(role.getId);
router.route("/role").get(role.getAll);
router.route("/role").post(role.add);
router.route("/role/:id").put(role.update);
router.route("/role/:id").delete(role.delete);

module.exports = router;