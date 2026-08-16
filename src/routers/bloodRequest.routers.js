import express from "express";
import bloodRequest from "../controllers/bloodRequest.controller";
import { verifySession, verifyOwnerViaQuery, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

const verifyBloodRequestOwner = verifyOwnerViaQuery(
  `SELECT r.USERID FROM BLOOD_REQUEST br
   JOIN RECIPIENT r ON br.RECIPENTID = r.RECIPENTID
   WHERE br.REQUESTID = ?`
);

const verifyRecipientOwnerByRecipentId = verifyOwnerViaQuery(
  `SELECT USERID FROM RECIPIENT WHERE RECIPENTID = ?`,
  "recipientId"
);
router.route("/bloodRequest/pending").get(verifySession, bloodRequest.getPending);
router.route("/bloodRequest/recipient/:recipientId").get(verifySession, verifyRecipientOwnerByRecipentId, bloodRequest.getByRecipient);
router.route("/bloodRequest/:id").get(verifySession, verifyBloodRequestOwner, bloodRequest.getId);
router.route("/bloodRequest").get(verifySession, bloodRequest.getAll);
router.route("/bloodRequest").post(verifySession, bloodRequest.add);
router.route("/bloodRequest/:id").put(verifySession, verifyBloodRequestOwner, bloodRequest.update);
router.route("/bloodRequest/:id").delete(verifySession, verifyBloodRequestOwner, bloodRequest.delete);

module.exports = router;