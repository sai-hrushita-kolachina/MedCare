import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  patientName: String,
  patientEmail: String,
  patientAddress: String,
  doctorName: String,
  doctorImage: String,
  consultationType: String,
  date: String,
  time: String,
  status: {
    type: String,
    default: "Confirmed",   // confirmed, cancelled
  },
  paymentId: {
    type: String,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Session", sessionSchema);
