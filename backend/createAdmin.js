import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/adminModel.js";

mongoose.connect("mongodb://127.0.0.1:27017/medcare")
  .then(async () => {
    const hashed = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@gmail.com",
      password: hashed,
    });

    console.log("Admin Created!");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
