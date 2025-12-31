import multer from "multer";
import path from "path";
import express from "express";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    imageUrl: `/uploads/${req.file.filename}`,
  });
});

export default router;
