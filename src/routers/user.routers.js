import express from "express";
import user from "../controllers/user.controller";

const router = express.Router();

router.route("/user/:id").get(user.getId);
router.route("/user").get(user.getAll);
router.route("/user").post(user.add);
router.route("/user/:id").put(user.update);
router.route("/user/:id").delete(user.delete);

module.exports = router;