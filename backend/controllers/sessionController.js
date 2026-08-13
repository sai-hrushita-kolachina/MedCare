import Session from "../models/sessionModel.js";

// SAVE BOOKING
export const createSession = async (req, res) => {
  try {
    const exists = await Session.findOne({
      paymentId: req.body.paymentId,
    });

    if (exists) {
      return res.json({
        success: false,
        message: "Booking already saved",
      });
    }

    const session = new Session({
      patientName: req.body.patientName,
      patientEmail: req.body.patientEmail,
      patientAddress: req.body.patientAddress,

      doctorName: req.body.doctorName,
      doctorImage: req.body.doctorImage,
      consultationType: req.body.consultationType,
      date: req.body.date,
      time: req.body.time,

      status: req.body.status || "Confirmed",

      paymentId: req.body.paymentId,
    });

    await session.save();

    res.json({
      success: true,
      session,
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This slot has already been booked",
      });
    }

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// GET ALL BOOKINGS - ADMIN
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session
      .find()
      .sort({ createdAt: -1 });

    res.json(sessions);

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }
};


// GET USER BOOKINGS
export const getUserBookings = async (req, res) => {
  try {
    const { email } = req.params;

    const bookings = await Session
      .find({
        patientEmail: email,
      })
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      bookings,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }
};


// CHECK PAYMENT EXISTS
export const checkSessionExists = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    const exists = await Session.findOne({
      paymentId,
    });

    if (exists) {
      return res.json({
        found: true,
      });
    }

    res.json({
      found: false,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }
};


// GET AVAILABLE SLOTS
export const getAvailableSlots = async (req, res) => {
  try {
    let doctorName = decodeURIComponent(
      req.params.doctorName
    ).trim();

    const date = decodeURIComponent(
      req.params.date
    ).trim();

    doctorName = doctorName.replace(
      /^Dr\s+/i,
      "Dr. "
    );

    console.log("=================================");
    console.log("CHECKING AVAILABILITY");
    console.log("Doctor:", doctorName);
    console.log("Date:", date);
    console.log("=================================");

    const allSlots = [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
    ];

    const bookings = await Session.find({
      doctorName: doctorName,
      date: date,
    });

    console.log(
      "BOOKINGS FOUND:",
      bookings
    );

    const activeBookings = bookings.filter(
      (booking) =>
        booking.status === "Pending" ||
        booking.status === "Confirmed"
    );

    console.log(
      "ACTIVE BOOKINGS:",
      activeBookings
    );

    const bookedSlots = activeBookings.map(
      (booking) => booking.time
    );

    console.log(
      "BOOKED SLOTS:",
      bookedSlots
    );

    const availableSlots = allSlots.filter(
      (slot) =>
        !bookedSlots.includes(slot)
    );

    console.log(
      "AVAILABLE SLOTS:",
      availableSlots
    );

    res.json({
      success: true,
      slots: availableSlots,
      bookedSlots: bookedSlots,
    });

  } catch (err) {
    console.error(
      "Error getting available slots:",
      err
    );

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Session.findByIdAndUpdate(
      id,
      {status: "Cancelled",},
      {new: true,}
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      updated,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }
};


// UPDATE BOOKING STATUS - ADMIN
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Session.findByIdAndUpdate(
      req.params.id,
      {status: req.body.status,},
      {new: true,}
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json(booking);

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Error updating status",
    });

  }
};