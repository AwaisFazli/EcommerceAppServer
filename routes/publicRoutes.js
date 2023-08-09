const { Router } = require("express");
const router = Router();
const productSchema = require("../modals/productSchema");
const SellerSchema = require("../modals/sellerSchema");
// const { imageUploader, getFileStream } = require("../middlewares/s3");

// router.get("/images/:key", (req, res) => {
//   const key = req.params.key;
//   const readStream = getFileStream(key);

//   readStream.pipe(res);
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
    const deleteResult = await SellerSchema.deleteMany({});

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

module.exports = router;
