import { toast } from "react-toastify";

//sign in
export const notifyLoginSuccess = () => toast.success("Login successful!");
export const notifyLoginFail = () => toast.error("Login failed!");
export const notifyRegisterSuccess = () => toast.success("Registered successfully!");
export const notifyRegisterFail = () => toast.error("Registration failed!");

// payments
export const notifyPaymentSuccess = () => toast.success("Payment successful!");
export const notifyPaymentFail = () => toast.error("Payment failed!");

// bookings
export const notifyBookingSaved = () => toast.success("Booking confirmed!");
export const notifyBookingCancelled = () => toast.info("Booking cancelled!");
export const notifyBookingFail = () => toast.error("Booking failed!");

// backend
export const notifyBackendError = () => toast.error("Something went wrong!");
