const express = require("express");
const { createRole, getAllRole } = require("../controllers/Role");
const roleRoute = express.Router();
roleRoute.post("/", createRole);
roleRoute.get("/", getAllRole);
module.exports = { roleRoute };
