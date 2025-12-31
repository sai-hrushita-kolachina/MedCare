import express from "express";
import AllDoctors from "../models/allDoctorsModel.js";
import { 
  getAllDoctors, 
  getDoctorById,
  updateDoctor,
  deleteDoctor
} from "../controllers/allDoctorsController.js";

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", async (req, res) => {
  try {
    const newDoctor = new AllDoctors(req.body);
    await newDoctor.save();
    res.status(200).json({ message: "Doctor added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor", error });
  }
});
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
