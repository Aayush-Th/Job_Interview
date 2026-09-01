const express = require("express");

const authRouter = express.Router();
const authController = require("../controller/auth.controller");

authRouter.post("/register", authController.registerUserController);

module.exports = authRouter;