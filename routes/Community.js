const express = require("express");
const {
  allCommunity,
  createCommunity,
  getAllMembers,
  getMyOwnCommunity,
  getMyJoinedCommunity,
} = require("../controllers/Community");
const communityRoute = express.Router();
communityRoute.get("/", allCommunity);
communityRoute.post("/", createCommunity);
communityRoute.get("/:id/members", getAllMembers);
communityRoute.get("/me/owner", getMyOwnCommunity);
communityRoute.get("/me/member", getMyJoinedCommunity);

module.exports = { communityRoute };
