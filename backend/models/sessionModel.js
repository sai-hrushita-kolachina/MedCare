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
    default: "Confirmed",
  },
  paymentId: {
    type: String,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

sessionSchema.index(
  {
    doctorName: 1,
    date: 1,
    time: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: {
        $in: ["Pending", "Confirmed"],
      },
    },
  }
);

export default mongoose.model("Session", sessionSchema);