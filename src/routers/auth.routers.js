import express from "express";
import auth from "../controllers/auth.controller";
import { verifySession } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/auth/register").post(auth.register);
router.route("/auth/login").post(auth.login);
router.route("/auth/logout").post(auth.logout);
router.route("/auth/me").get(verifySession, auth.getMe);
router.route("/auth/changePassword").put(verifySession, auth.changePassword);

module.exports = router;