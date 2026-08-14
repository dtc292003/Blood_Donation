import express from "express";
import donation from "../controllers/donation.cotroller";

const router = express.Router();

router.route("/donation/user/:userId").get(donation.getByUser);
router.route("/donation/:id").get(donation.getId);
router.route("/donation").get(donation.getAll);
router.route("/donation").post(donation.add);
router.route("/donation/:id").put(donation.update);
router.route("/donation/:id").delete(donation.delete);

module.exports = router;