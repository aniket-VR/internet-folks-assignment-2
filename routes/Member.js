const express = require("express");
const { deleteMember, addMember } = require("../controllers/Member");
const memberRoute = express.Router();
memberRoute.post("/", addMember);
memberRoute.delete("/:id", deleteMember);
module.exports = { memberRoute };
