require("dotenv").config();
const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const userModel = require("../models//userData");
const bcrypt = require("bcryptjs");

const generateToken = (username) => {
  let token = jwt.sign({ username: username }, process.env.JWT_KEY, { expiresIn: "7d" });
  return token;
};

const dummySite = (req, res) => {
  console.log(req.query);
  console.log(req.body);
  res.send("dummy site");
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("parameters missing", 400);
  }
  const userExists = await userModel.findOne({ username });
  console.log(userExists);
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    const token = generateToken(username);
    console.log(token);
    res.json({ msg: "sucessful login", token: token });
  } else {
    throw new CustomAPIError("Invalid password or username", 400);
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("parameters missing", 400);
  }
  const userExists = await userModel.findOne({ username });
  if (userExists) {
    throw new CustomAPIError("username already exists", 400);
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //register user
  const user = await userModel.create({ username, password: hashedPassword });

  if (user) {
    const token = generateToken(username);
    console.log(token);
    res.status(201).json({
      msg: "user sucessfully registered!",
    });
  } else {
    throw new CustomAPIError("Invalid user data", 400);
  }
};

const dashboard = (req, res) => {
  console.log(req.user);

  const username = req.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  return res.json({
    msg: `Hello ${username}`,
    secret: `Here is your authorisez data,your lucky nmber is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard, registerUser, dummySite };
