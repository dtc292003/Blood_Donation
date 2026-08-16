import express from "express";
import recipient from "../controllers/recipient.controller";
import RecipientServices from "../services/recipient.service";
import { verifySession, verifyResourceOwnerOrAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

const verifyRecipientOwner = verifyResourceOwnerOrAdmin(RecipientServices.getId);

router.route("/recipient/:id").get(verifySession, verifyRecipientOwner, recipient.getId);
router.route("/recipient").get(verifySession, recipient.getAll);
router.route("/recipient").post(verifySession, recipient.add);
router.route("/recipient/:id").put(verifySession, verifyRecipientOwner, recipient.update);
router.route("/recipient/:id").delete(verifySession, verifyRecipientOwner, recipient.delete);

module.exports = router;