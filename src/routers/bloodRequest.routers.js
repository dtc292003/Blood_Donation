import express from "express";
import bloodRequest from "../controllers/bloodRequest.controller";

const router = express.Router();

router.route("/bloodRequest/pending").get(bloodRequest.getPending);
router.route("/bloodRequest/recipient/:recipientId").get(bloodRequest.getByRecipient);
router.route("/bloodRequest/:id").get(bloodRequest.getId);
router.route("/bloodRequest").get(bloodRequest.getAll);
router.route("/bloodRequest").post(bloodRequest.add);
router.route("/bloodRequest/:id").put(bloodRequest.update);
router.route("/bloodRequest/:id").delete(bloodRequest.delete);


module.exports = router;