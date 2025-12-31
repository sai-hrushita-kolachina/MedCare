import AllDoctors from "../models/allDoctorsModel.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await AllDoctors.find();
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Error fetching doctors" });
  }
};


export const getDoctorById = async (req, res) => {
  try {
    const doctor = await AllDoctors.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Error fetching doctor" });
  }
};


export const updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await AllDoctors.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor updated successfully", updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Error updating doctor" });
  }
};


export const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await AllDoctors.findByIdAndDelete(req.params.id);

    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Error deleting doctor" });
  }
};


export const addDoctor = async (req, res) => {
  try {
    const doctor = await AllDoctors.create(req.body);
    res.json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ message: "Error adding doctor" });
  }
};

