import express from "express";
import donor from "../controllers/donor.controller";
import DonorServices from "../services/donor.service";
import { verifySession, verifyResourceOwnerOrAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

const verifyDonorOwner = verifyResourceOwnerOrAdmin(DonorServices.getId);

router.route("/donor/:id").get(verifySession, verifyDonorOwner, donor.getId);
router.route("/donor").get(verifySession, donor.getAll);
router.route("/donor/salient").get(verifySession, donor.getDonorSalient);
router.route("/donor").post(verifySession, donor.add);
router.route("/donor/:id").put(verifySession, verifyDonorOwner, donor.update);
router.route("/donor/:id").delete(verifySession, verifyDonorOwner, donor.delete);

module.exports = router;