import express from "express";
import {
  createSession,
  getSessions,
  getUserBookings,
  checkSessionExists,
  cancelBooking,
  updateBookingStatus
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/add", createSession);
router.get("/all", getSessions);
router.get("/my-bookings/:email", getUserBookings);
router.get("/check/:paymentId", checkSessionExists);
router.patch("/cancel/:id", cancelBooking);

router.put("/status/:id", updateBookingStatus);
export default router;
