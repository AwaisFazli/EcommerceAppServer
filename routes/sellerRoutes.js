const auth = require("../middlewares/auth");
const sellerControllers = require("../controllers/sellerControllers");
const imageSaver = require("../middlewares/imageSaver");
// const { imageUploader } = require("../middlewares/s3");

const { Router } = require("express");
const router = Router();
// Sellers
// Router = localhost:8000/seller

// seller -> signup -> signin -> upload product -> update product -> order view -> edit orders status

// Post Seller signup
// Credentials save
router.post("/signup", sellerControllers.Signup);

// Post Seller Signin
// Through Credentials and will get JWT
// JWT will be stored in local storage
router.post("/signin", sellerControllers.Signin);

// Get Seller Data
router.get("/userdata", auth, sellerControllers.getUserData);

// Post Seller Product upload
// Will send product details witl jwt
// server will check the id through JWT and will made the record of product with rspective id to the seller
router.post("/product", auth, imageSaver, sellerControllers.createProduct);

// Put Seller Product Edit
// will send the product details with product id and its own id using JWT and server will check if the product id is available
// if available then we will proceed if not then send product not available if available the we will match the seller id
// written in product if it matches with the sender it then we will make the changes otherwise throw error of unauthorized
router.put("/productData/:id", auth, sellerControllers.editProduct);
router.post(
  "/productImage/:id",
  auth,
  imageSaver,
  sellerControllers.editProductImage
);

// Delete Seller Product Edit
// will send the product details with product id and its own id using JWT and server will check if the product id is available
// if available then we will proceed to delete the product
router.delete("/product/:id", auth, sellerControllers.deleteProduct);

// Get Seller Orders View
// Will send the get request with the seller id through JWT server will authorize it and will send back the sellers order
router.get("/myOrders", auth, sellerControllers.viewOrders);

// Get Seller Products View
// Will send the get request with the seller id through JWT server will authorize it and will send back the sellers order
router.get("/myProducts", auth, sellerControllers.viewProduct);

// Put Seller Order Status Edit
// Will send the order id with seller id through jwt and server will authenticate the both ids if matched then the status will be
// changed otherwise unauthorize message will be shown
router.put("/order/:id", auth, sellerControllers.editOrderStatus);
router.get("/orders", auth, sellerControllers.viewOrders);

module.exports = router;
