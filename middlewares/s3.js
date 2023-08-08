const AWS = require("aws-sdk");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const S3FS = require("s3fs"); // Import the s3fs package

const appRoot = global.appRoot;
const uploadDir = path.join(appRoot, "uploads/");

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_Region = process.env.AWS_BUCKET_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_BUCKET_Region,
});

const s3 = new AWS.S3();
const s3fsImpl = new S3FS(AWS_BUCKET_NAME, {
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_BUCKET_Region,
});

const ensureUploadsDirectory = () => {
  // No need to create a local directory when using s3fs
};

const storage = multer.memoryStorage(); // Use memory storage for multer

const imageSaver = multer({ storage: storage }).single("image");

const uploadFile = async (file) => {
  if (!file || !file.buffer || !file.originalname) {
    throw new Error("Invalid file object");
  }

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: file.buffer,
    Key: file.originalname,
  };

  return s3.upload(uploadParams).promise();
};

const imageUploader = (req, res, next) => {
  imageSaver(req, res, async function (err) {
    if (err) {
      console.log("File Not Uploaded");
      console.error(err);
      res.status(500).send("Couldn't Save the File");
    } else {
      try {
        const file = req.file;

        if (!file) {
          return res.status(400).send("No file provided");
        }

        const s3Response = await uploadFile(file);

        req.result = s3Response;

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
