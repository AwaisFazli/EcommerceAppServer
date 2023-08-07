const Seller = require("../modals/sellerSchema");
const Purchaser = require("../modals/purchaserSchema");
const Product = require("../modals/productSchema");
const Order = require("../modals/orderSchema");

const purchaserControllers = {};

// Controller for Purchaser Signup
purchaserControllers.Signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingPurchaser = await Purchaser.findOne({ email });

    if (existingPurchaser) {
      return res
        .status(400)
        .json({ error: "Purchaser with this email already exists." });
    }

    const newPurchaser = { email, password };
    await Purchaser.create(newPurchaser);

    res.send("Purchaser Signup Successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign up Purchaser" });
  }
};

// Controller for Purchaser Signin
purchaserControllers.Signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingPurchaser = await Purchaser.findOne({ email });

    if (!existingPurchaser) {
      return res
        .status(404)
        .json({ error: "Purchaser with this email does not exist." });
    }

    if (existingPurchaser.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    res.send("Purchaser Signin Successful");
  } catch (error) {
    res.status(500).json({ message: "Failed to sign in Purchaser" });
  }
};

// Controller for Purchaser to View All Products
purchaserControllers.viewProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Controller to send Products in Cart
purchaserControllers.addProductToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    // Assuming you have a way to associate the cart with the purchaser, for example, using req.userId
    const purchaserId = req.userId;
    const cartItem = { product: productId, purchaser: purchaserId };
    await Cart.create(cartItem);
    res.send(`Product with ID ${productId} has been added to the cart.`);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product to cart" });
  }
};

// Controller to view Products available in Cart
purchaserControllers.viewCartProducts = async (req, res) => {
  try {
    // Assuming you have a way to associate cart items with the purchaser, for example, using req.userId
    const purchaserId = req.userId;
    const cartItems = await Cart.find({ purchaser: purchaserId }).populate(
      "product"
    );
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

// Controller for Purchaser to Checkout
purchaserControllers.checkout = async (req, res) => {
  try {
    // Assuming you have a way to associate cart items with the purchaser, for example, using req.userId
    const purchaserId = req.userId;
    const cartItems = await Cart.find({ purchaser: purchaserId });

    // Assuming you have a way to calculate the total amount and other details for the order
    const order = {
      purchaser: purchaserId,
      products: cartItems.map((item) => item.product),
      totalAmount: 100, // Replace with the actual calculated total amount
      createdAt: new Date(),
    };

    await Order.create(order);

    // Assuming you have a way to handle payment processing (e.g., using Stripe API)
    // Implement the payment processing logic here...

    // Clear the cart after successful checkout
    await Cart.deleteMany({ purchaser: purchaserId });

    res.send("Checkout via Stripe");
  } catch (error) {
    res.status(500).json({ message: "Failed to complete checkout" });
  }
};

// Controller to View Order List
purchaserControllers.viewOrders = async (req, res) => {
  try {
    // Assuming you have a way to associate orders with the purchaser, for example, using req.userId
    const purchaserId = req.userId;
    const orders = await Order.find({ purchaser: purchaserId }).populate(
      "products"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = purchaserControllers;
