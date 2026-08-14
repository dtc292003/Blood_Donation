import express from "express";
import match from "../controllers/match.controller";

const router = express.Router();

// Nâng cao — đặt trước /:id
router.route("/match/request/:requestId").get(match.getByRequest);   // ai muốn hiến cho request này
router.route("/match/donor/:donorId").get(match.getByDonor);         // donor này đã apply request nào
router.route("/match/apply").post(match.apply);                      // donor gửi lời đề nghị hiến
router.route("/match/:id/accept").put(match.accept);                 // recipient chấp nhận
router.route("/match/:id/reject").put(match.reject);                 // recipient từ chối
router.route("/match/:id/cancel").put(match.cancel);                 // donor tự hủy
router.route("/match/:id/complete").put(match.complete);             // đánh dấu đã hiến xong

// CRUD cơ bản
router.route("/match/:id").get(match.getId);
router.route("/match").get(match.getAll);
router.route("/match/:id").delete(match.delete);

module.exports = router;