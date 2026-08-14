import express from "express";
import recipient from "../controllers/recipient.controller";

const router = express.Router();

router.route("/recipient/:id").get(recipient.getId);
router.route("/recipient").get(recipient.getAll);
router.route("/recipient").post(recipient.add);
router.route("/recipient/:id").put(recipient.update);
router.route("/recipient/:id").delete(recipient.delete);

module.exports = router;