const { Router } = require("express");
const router = Router();
const productSchema = require("../modals/productSchema");
const SellerSchema = require("../modals/sellerSchema");

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
