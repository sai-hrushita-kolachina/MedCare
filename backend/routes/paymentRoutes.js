import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET);

router.post("/create-checkout-session", async (req, res) => {
  let { doctorName, consultationType, date, time, price } = req.body;

  if (consultationType === "Audio") price = 150;
  if (consultationType === "Video") price = 250;
  if (consultationType === "Chat") price = 0;


  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      // store session details inside Stripe metadata
      metadata: {
        doctorName,
        doctorImage: req.body.doctorImage,
        consultationType,
        date,
        time,
        patientEmail: req.body.patientEmail,
        patientName: req.body.patientName,
      },

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${consultationType} Consultation with ${doctorName}`,
              description: `${date} at ${time}`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Platform Fee" },
            unit_amount: 10 * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `https://medcare24.vercel.app/booking-success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: "https://medcare24.vercel.app/book-session",
    });

    // return checkout page URL
    res.json({ url: session.url });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get session details after payment
router.get("/session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);

    res.json({
      success: true,
      paymentId: session.payment_intent,
      doctorName: session.metadata.doctorName,
      doctorImage: session.metadata.doctorImage,
      consultationType: session.metadata.consultationType,
      date: session.metadata.date,
      time: session.metadata.time,
      patientEmail: session.metadata.patientEmail,
      patientName: session.metadata.patientName,
      amount: session.amount_total / 100,
    });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


export default router;
