
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
  
      const user = await UserModel.findOne({ email }).select("-password"); // exclude password
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  };

// REGISTER
const createUser = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    // Check if user exists
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.json({ error: "User already exists!" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: "Account created successfully, Welcome!",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    return res.status(200).json({
      success: "Login successful, welcome!",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// TEST
const test = async (req, res) => {
  return res.json({
    message: "Server Folders Connected Successfully!",
  });
};

module.exports = {
  test,
  getUser,
  createUser,
  loginUser, // added here
};
