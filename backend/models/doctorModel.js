import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  speciality: String,
  image: String,
  experience: Number,
});

export default mongoose.model("Doctor", doctorSchema);
