import Doctor from "../models/doctorModel.js";

export const addDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
