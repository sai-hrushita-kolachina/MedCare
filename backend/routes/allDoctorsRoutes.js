import express from "express";
import {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  addDoctor,
} from "../controllers/allDoctorsController.js";

const router = express.Router();

router.get("/:id", getDoctorById);
router.get("/", getAllDoctors);
router.post("/", addDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);


export default router;
