const { Router } = require("express");
const router = Router();
const productSchema = require("../modals/productSchema");
const { imageUploader, getFileStream } = require("../middlewares/s3");

router.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

// router.post("/uploadphoto", upload.single("image"), async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
//   const file = req.file;

//   const result = await uploadFile(file);
//   console.log(result);
//   res.send({ imagePath: `image/${result.Key}` });
// });

router.get("/products", async (req, res) => {
  try {
    const products = await productSchema.find({});
    res.send(products);
  } catch (error) {
    console.error(error.message);
    res.send("Something went wrong");
  }
});

router.delete("/products", async (req, res) => {
  try {
    const deleteResult = await productSchema.deleteMany({});

    if (deleteResult.deletedCount > 0) {
      res.send(`Deleted ${deleteResult.deletedCount} products.`);
    } else {
      res.send("No products found to delete.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/uploadphoto", imageUploader, (req, res) => {
  console.log(req.result);
  res.send(req.res);
});

router.delete("/uploadphoto", imageUploader, (req, res) => {
  console.log(req.result);
  res.send(req.res);
});

module.exports = router;
