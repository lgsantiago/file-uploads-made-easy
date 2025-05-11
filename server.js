import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" }); // Files will be saved to an 'uploads' folder

// Enable CORS
app.use(cors());

// File upload endpoint
app.post("/upload", upload.array("files"), (req, res) => {
  try {
    // Log the received files
    console.log("Received files:", req.files);

    // Return success response with file details
    res.json({
      status: "success",
      message: "Files uploaded successfully",
      files: req.files.map((file) => ({
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      })),
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      status: "error",
      message: "File upload failed",
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
