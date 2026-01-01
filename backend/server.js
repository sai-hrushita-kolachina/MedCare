import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import doctorRoutes from "./routes/doctorRoutes.js";
import allDoctorsRoutes from "./routes/allDoctorsRoutes.js";
import predictRoutes from "./routes/predictRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    "https://medcare24.vercel.app",
    "https://med-care-admin.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use("/assets", express.static("assets"));


app.use("/api/doctor", doctorRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/alldoctors", allDoctorsRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
