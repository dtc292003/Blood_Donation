import express from "express";
import notification from "../controllers/notification.controller";
import { verifySession, verifyOwnerOrAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/notification/user/:userId").get(verifySession, verifyOwnerOrAdmin, notification.getByUser);
router.route("/notification/user/:userId/unread").get(verifySession, verifyOwnerOrAdmin, notification.getUnreadByUser);
router.route("/notification/user/:userId/markAllRead").put(verifySession, verifyOwnerOrAdmin, notification.markAllAsRead);
router.route("/notification/:id/read").put(verifySession, notification.markAsRead);
router.route("/notification/:id").get(verifySession, notification.getId);
router.route("/notification").get(verifySession, notification.getAll);
router.route("/notification").post(verifySession, notification.add);
router.route("/notification/:id").put(verifySession, notification.update);
router.route("/notification/:id").delete(verifySession, notification.delete);

module.exports = router;