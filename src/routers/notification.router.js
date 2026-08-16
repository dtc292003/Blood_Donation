import express from "express";
import notification from "../controllers/notification.controller";
import { verifySession, verifyOwnerOrAdmin, verifyOwnerViaQuery, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

const verifyNotificationOwner = verifyOwnerViaQuery(`SELECT USERID FROM NOTIFICATION WHERE NOTIFICATIONID = ?`);

router.route("/notification/user/:userId").get(verifySession, verifyOwnerOrAdmin, notification.getByUser);
router.route("/notification/user/:userId/unread").get(verifySession, verifyOwnerOrAdmin, notification.getUnreadByUser);
router.route("/notification/user/:userId/markAllRead").put(verifySession, verifyOwnerOrAdmin, notification.markAllAsRead);

router.route("/notification/:id/read").put(verifySession, verifyNotificationOwner, notification.markAsRead);
router.route("/notification/:id").get(verifySession, verifyNotificationOwner, notification.getId);
router.route("/notification").get(verifySession, requireAdmin, notification.getAll);

router.route("/notification").post(verifySession, requireAdmin, notification.add);
router.route("/notification/:id").put(verifySession, verifyNotificationOwner, notification.update);
router.route("/notification/:id").delete(verifySession, verifyNotificationOwner, notification.delete);

module.exports = router;