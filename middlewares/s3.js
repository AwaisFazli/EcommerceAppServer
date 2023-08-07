const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const appRoot = global.appRoot;
const uploadDir = path.join(appRoot, "uploads/");

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_Region = process.env.AWS_BUCKET_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
AWS.config.apiVersions = {};
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_BUCKET_Region,
  AWS_SDK_LOAD_CONFIG: 1,
});
const s3 = new AWS.S3();

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
});

const imageSaver = multer({ storage: storage }).single("image");

const uploadFile = (file) => {
  if (!file || !file.path || !file.filename) {
    throw new Error("Invalid file object");
  }

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};

const imageUploader = (req, res, next) => {
  imageSaver(req, res, async function (err) {
    if (err) {
      console.log("File Not Uploaded");
      console.error(err);
      res.status(500).send("Couldnt Save the File");
    } else {
      try {
        const file = req.file;
        const localImagePath = req.file.path;

        if (!file) {
          return res.status(400).send("No file provided");
        }

        const s3Response = await uploadFile(file);

        req.result = s3Response;

        fs.unlinkSync(localImagePath);
        next();
      } catch (err) {
        console.error("Error uploading file to S3:", err);
        res.status(500).send("Error uploading file to S3");
      }
    }
  });
};

exports.imageUploader = imageUploader;

const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: AWS_BUCKET_NAME,
  };
  return s3.getObject(downloadParams).createReadStream();
};

exports.getFileStream = getFileStream;
