import Session from "../models/sessionModel.js";

// save booking
export const createSession = async (req, res) => {
  try {
    const exists = await Session.findOne({ paymentId: req.body.paymentId });
    if (exists) {
      return res.json({ success: false, message: "Booking already saved" });
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
      status: req.body.status || "Pending",
      paymentId: req.body.paymentId,
    });

    await session.save();
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// thhis is for admin
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await Session.find({ patientEmail: email }).sort({
      createdAt: -1,
    });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// if payment exists
export const checkSessionExists = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const exists = await Session.findOne({ paymentId });

    if (exists) return res.json({ found: true });
    res.json({ found: false });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// this is for user
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Session.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );
    res.json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// this is for admin
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Session.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};
