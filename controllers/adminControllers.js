const Seller = require("../modals/sellerSchema");
const Purchaser = require("../modals/purchaserSchema");
const Product = require("../modals/productSchema");
const Order = require("../modals/orderSchema");
const Admin = require("../modals/adminSchema");
const jwt = require("jsonwebtoken");

const adminControllers = {};

// Admin Signin
adminControllers.Signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res
        .status(404)
        .json({ error: "Admin with this email does not exist." });
    }

    if (existingAdmin.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const token = jwt.sign({ id: existingAdmin.id }, "Secret-Key", {
      expiresIn: "340924903294434",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign in admin" });
  }
};

// Controller to View Products:
adminControllers.viewProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Controller to View Sellers
adminControllers.viewSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({});
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sellers" });
  }
};

// Controller to View Purchasers
adminControllers.viewPurchasers = async (req, res) => {
  try {
    const purchasers = await Purchaser.find({});
    res.json(purchasers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch purchasers" });
  }
};

// Controller to Restrict the Purchaser
adminControllers.restrictPurchaser = async (req, res) => {
  try {
    const purchaserId = req.params.purchaserId;
    const result = await Purchaser.findByIdAndUpdate(purchaserId, {
      isRestricted: true,
    });
    if (result) {
      res.send(`Purchaser with ID ${purchaserId} has been restricted.`);
    } else {
      res.send(
        `Purchaser with ID ${purchaserId} not found or already restricted.`
      );
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to restrict purchaser" });
  }
};

// Controller to Restrict the Seller
adminControllers.restrictSeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const result = await Seller.findByIdAndUpdate(sellerId, {
      isRestricted: true,
    });
    if (result) {
      res.send(`Seller with ID ${sellerId} has been restricted.`);
    } else {
      res.send(`Seller with ID ${sellerId} not found or already restricted.`);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to restrict seller" });
  }
};

// Controller to Restrict the Product
adminControllers.restrictProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await Product.findByIdAndUpdate(productId, {
      isRestricted: true,
    });
    if (result) {
      res.send(`Product with ID ${productId} has been restricted.`);
    } else {
      res.send(`Product with ID ${productId} not found or already restricted.`);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to restrict product" });
  }
};

// Controller to View Orders
adminControllers.viewOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = adminControllers;
