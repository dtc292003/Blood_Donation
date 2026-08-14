import express from "express";
import donor from "../controllers/donor.cotroller";

const router = express.Router();

router.route("/donor/:id").get(donor.getId);
router.route("/donor").get(donor.getAll);
router.route("/donor/salient").get(donor.getDonorSalient);
router.route("/donor").post(donor.add);
router.route("/donor/:id").put(donor.update);
router.route("/donor/:id").delete(donor.delete);

module.exports = router;