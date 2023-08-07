const auth = require("../middlewares/auth");
const adminControllers = require("../controllers/adminControllers");
const { Router } = require("express");
const router = Router();

// Admins
// Router = localhost:8000/admin

// Can view Products
router.post("/signin", adminControllers.Signin);

// Can view Products
router.get("/products", auth, adminControllers.viewProducts);

// Can view Sellers
router.get("/Sellers", auth, adminControllers.viewSellers);

// Can view Purchasers
router.get("/purchaser", auth, adminControllers.viewPurchasers);

// Can restrict Products, seller, purchasers
router.put("/purchaser/restrict/:id", auth, (req, res) => {
  res.send("restrict the particular purchaser from doing any activity");
});
router.put("/Seller/restrict/:id", auth, (req, res) => {
  res.send("restrict the particular Seller from doing any activity");
});
router.put("/Products/restrict/:id", auth, (req, res) => {
  res.send("restrict the particular product to be shown in the list");
});

// Can view orders
router.get("/orders", auth, (req, res) => {
  res.send("list down all of the Orders");
});

module.exports = router;
