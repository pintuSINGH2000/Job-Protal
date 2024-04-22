const { hashPassword, comparePassword } = require("../helper/hashPassword");
const User = require("../model/user");
const JWT = require("jsonwebtoken");

const registerController = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).send({ errorMessage: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).send({ message: "User Register Successfully" });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ errorMessage: "Bad request" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(409).send({ errorMessage: "User doesn't exists" });
    }
    const check = await comparePassword(password, user.password);
    if (!check) {
      return res.status(401).send({ errorMessage: "Invalid credentials" });
    }
    const token = JWT.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "60h",
    });
    res
      .status(200)
      .send({ message: "Login successfully", token, name: user.name });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
};
