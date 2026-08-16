import express from "express";
import match from "../controllers/match.controller";
import { verifySession, verifyOwnerViaQuery, requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

const verifyMatchRecipientOwner = verifyOwnerViaQuery(
  `SELECT r.USERID FROM \`MATCH\` m
   JOIN BLOOD_REQUEST br ON m.REQUESTID = br.REQUESTID
   JOIN RECIPIENT r ON br.RECIPENTID = r.RECIPENTID
   WHERE m.ID_MATCH = ?`
);

const verifyMatchDonorOwner = verifyOwnerViaQuery(
  `SELECT d.USERID FROM \`MATCH\` m
   JOIN DONOR d ON m.DONORID = d.DONORID
   WHERE m.ID_MATCH = ?`
);

router.route("/match/request/:requestId").get(verifySession, match.getByRequest);
router.route("/match/donor/:donorId").get(verifySession, match.getByDonor);
router.route("/match/apply").post(verifySession, match.apply);
router.route("/match/:id/accept").put(verifySession, verifyMatchRecipientOwner, match.accept);
router.route("/match/:id/reject").put(verifySession, verifyMatchRecipientOwner, match.reject);
router.route("/match/:id/cancel").put(verifySession, verifyMatchDonorOwner, match.cancel);

router.route("/match/:id/complete").put(verifySession, requireAdmin, match.complete);

router.route("/match/:id").get(verifySession, match.getId);
router.route("/match").get(verifySession, requireAdmin, match.getAll);
router.route("/match/:id").delete(verifySession, requireAdmin, match.delete);

module.exports = router;