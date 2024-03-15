import express from "express";
import {
  updateDoctor,
  getAllDoctors,
  getSingleDoctor,
  deleteDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "./../auths/verifyToken.js";

const router = express.Router();

import reviewRouter from "./review.js";

router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", authenticate, getSingleDoctor);
router.get("/", authenticate, getAllDoctors);
router.put("/:id", authenticate, updateDoctor);
router.delete("/:id", authenticate,  deleteDoctor);

router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
