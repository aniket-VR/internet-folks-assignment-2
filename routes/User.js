const express = require("express");
const { createAccount, userLogin, getMe } = require("../controllers/User");
const userRoute = express.Router();
userRoute.post("/signup", createAccount);
userRoute.post("/signin", userLogin);
userRoute.get("/me", getMe);
module.exports = { userRoute };
