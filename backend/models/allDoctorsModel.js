import mongoose from "mongoose";

const allDoctorsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  image: { type: String, required: true },
  experience: { type: Number, required: true }
});

export default mongoose.model("AllDoctors", allDoctorsSchema);
