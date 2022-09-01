const express = require("express");
const routeAuthMiddleware = require("../middleware/routeAuth");
const { login, dashboard, registerUser, dummySite } = require("../controllers/main");

const router = express.Router();

router.route("/login").post(login);
router.route("/dummy").post(dummySite);
router.route("/register").post(registerUser);
router.route("/dashboard").get(routeAuthMiddleware, dashboard);

module.exports = router;
