import express from "express";
import notification from "../controllers/notification.controller";

const router = express.Router();

router.route("/notification/user/:userId").get(notification.getByUser);
router.route("/notification/user/:userId/unread").get(notification.getUnreadByUser);
router.route("/notification/user/:userId/markAllRead").put(notification.markAllAsRead);
router.route("/notification/:id/read").put(notification.markAsRead);
router.route("/notification/:id").get(notification.getId);
router.route("/notification").get(notification.getAll);
router.route("/notification").post(notification.add);
router.route("/notification/:id").put(notification.update);
router.route("/notification/:id").delete(notification.delete);

module.exports = router;