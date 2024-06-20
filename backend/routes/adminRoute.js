const express = require("express");
const{ signup, login } = require("../controllers/adminController");
const adminRouter = express.Router();

adminRouter.post("/login", login);
adminRouter.post("/signup", signup);

module.exports = adminRouter;