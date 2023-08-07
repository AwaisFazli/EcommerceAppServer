const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v2 } = require("cloudinary");
const cloudinary = v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: "djjn4dxpu",
  api_key: "435913532677436",
  api_secret: "fz83D8iflwaBX6v3ugmU_Ce2wMw",
});

const appRoot = global.appRoot;
const uploadDir = path.join(appRoot, "uploads/");

const ensureUploadsDirectory = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirectory();
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const imageSaver = multer({ storage: storage }).single("image");

module.exports = (req, res, next) => {
  imageSaver(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to save the image." });
    }

    const localImagePath = req.file.path;

    cloudinary.uploader.upload(
      localImagePath,
      { public_id: "unique_public_id_for_image" },
      function (error, result) {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res
            .status(500)
            .json({ error: "Failed to upload the image to Cloudinary." });
        }

        const cloudinaryUrl = result.secure_url;
        req.imageUrl = cloudinaryUrl;

        fs.unlinkSync(localImagePath);

        next();
      }
    );
  });
};
