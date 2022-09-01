const CustomAPIError = require("../errors/custom-error");
const userModel = require("../models/userData");

const routeAuth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("no token provided", 401);
  } else {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    try {
      req.user = await userModel.findOne(decoded.username).select("username");
      next();
    } catch (error) {
      throw new CustomAPIError("Unauthorized access", 401);
    }
  }
};
module.exports = routeAuth;
