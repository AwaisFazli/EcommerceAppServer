const Seller = require("../modals/sellerSchema");
const Purchaser = require("../modals/purchaserSchema");
const Product = require("../modals/productSchema");
const Order = require("../modals/orderSchema");
const jwt = require("jsonwebtoken");

const sellerControllers = {};

// Controller to Signup for Seller
sellerControllers.Signup = async (req, res) => {
  console.log(req.body);
  const { email, password, username } = req.body;
  try {
    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res
        .status(400)
        .json({ error: "Seller with this email already exists." });
    }

    const newSeller = { email, password, username };
    const seller = await Seller.create(newSeller);

    res.send({ msg: "Seller Signup Successful", seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign up seller" });
  }
};

// Controller for Seller for Signin
sellerControllers.Signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const existingSeller = await Seller.findOne({ email });

    if (!existingSeller) {
      return res
        .status(404)
        .json({ error: "Seller with this email does not exist." });
    }

    if (existingSeller.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const token = jwt.sign({ id: existingSeller.id }, "Secret-Key", {
      expiresIn: "340924903294434",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign in seller" });
  }
};

// Controller to Create Sellers Products
sellerControllers.createProduct = async (req, res) => {
  const { name, description, price, stockQuantity } = req.body;
  const sellerId = req.userId;

  try {
    const newProduct = {
      name: name,
      description: description,
      sellerId: sellerId,
      price: price,
      stock: stockQuantity,
      imageUrl: `/images/${req.result.key}`,
    };
    const product = await Product.create(newProduct);
    res.send({ msg: "Seller Create Products Successful", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Controller to edit Sellers own Products
sellerControllers.editProduct = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product with this ID not found." });
    }

    const { name, description, price } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.imageUrl = `/images/${req.result.key}` || product.imageUrl;

    await product.save();

    res.send(`Edit Product with ID ${id} Successful`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to edit product" });
  }
};

// Controller to Delete the Products:
sellerControllers.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product with this ID not found." });
    }
    if (product.sellerId == req.userId) {
      await Product.findByIdAndDelete(id);
      return res.send(`Delete Product with ID ${id} Successful`);
    }
    res.status(201).json({ error: "Bad Request" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// Controller to View Sellers own Orders
sellerControllers.viewOrders = async (req, res) => {
  try {
    // Assuming you have a way to associate orders with the seller, for example, using req.userId
    const orders = await Order.find({ seller: req.userId }).populate(
      "products"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller orders" });
  }
};

// Controller to View Sellers own Products
sellerControllers.viewProduct = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller products" });
  }
};

// Controller to edit Sellers own Order Status
sellerControllers.editOrderStatus = async (req, res) => {
  const { orderId } = req.params; // Assuming you have a route parameter for orderId
  res.send(`Change Status of Order with ID ${orderId}`);
};

module.exports = sellerControllers;
