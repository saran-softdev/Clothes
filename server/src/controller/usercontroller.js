const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../model/user.model");

const generateRandomKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Function to handle addToCart action
const addToCart = async (userId, productId) => {
  console.log("<><><<", userId, productId);
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the product already exists in the cart
    const existingCartItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Push the product to the cart array
    user.cart.push({ productId });

    // Save the updated user document
    await user.save();

    return { success: true, message: "Item added to cart successfully" };
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return { success: false, message: "Failed to add item to cart" };
  }
};

// Function to handle removeFromCart action
const removeFromCart = async (userId, productId) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // Filter out the product from the cart
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    // Save the updated user document
    await user.save();

    return { success: true, message: "Item removed from cart successfully" };
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return { success: false, message: "Failed to remove item from cart" };
  }
};

const jwtSecretKey = generateRandomKey();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body; // Make sure to include 'email' here
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword }); // Include 'email' here
    await newUser.save();
    res.status(201).send("USER REGISTERED SUCCESSFULLY");
  } catch (error) {
    console.error(error);
    res.status(500).send("ERROR REGISTERING USER");
  }
});

router.post("/cart/add", async (req, res) => {
  try {
    const { productId, userId } = req.body;

    console.log(req.body);
    // return;
    const result = await addToCart(userId, productId);
    if (result.success) {
      res.json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Remove item from cart
router.delete("/cart/remove/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.id;

    const result = await removeFromCart(userId, productId);
    if (result.success) {
      res.json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Create user data object without sensitive information
        const userData = {
          _id: user._id,
          username: user.username,
          email: user.email
          // Add other properties as needed
        };

        // Generate JWT token with entire user data
        const token = jwt.sign(userData, jwtSecretKey, {
          expiresIn: "1h"
        });
        res.json({ token });
      } else {
        res.status(401).send("INVALID CREDENTIALS");
      }
    } else {
      res.status(401).send("INVALID CREDENTIALS");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("ERROR LOGGING IN");
  }
});

module.exports = router;
