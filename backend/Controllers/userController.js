const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// LOGIN USER
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// SIGNUP USER
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    // CREATE A TOKEN
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // res.json({ mssg: "signup user" });
};

module.exports = { signupUser, loginUser };
