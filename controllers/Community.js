const slugify = require("slugify");
const { communityRoute } = require("../routes/Community");
const { communityModel } = require("../module/Community");
const { userModel, userSchema } = require("../module/User");
const jwt = require("jsonwebtoken");
const { memberMode } = require("../module/Member");
const JoinedCommunityDTO = require("../dtos/JoinedCoummunityDTO");
const CreateCommunity = require("../dtos/CreateCommunity");
const AllMember = require("../dtos/AllMember");
const MyCommunity = require("../dtos/MyCommunity");

const allCommunity = async (req, res) => {
  try {
    const allComm = await communityModel
      .find({})
      .populate("owner", "id")
      .populate("owner", "name");
    res.send({
      status: true,
      content: {
        meta: {
          total: allComm.length,
          pages: Math.floor(allComm.length / 10) + 1,
          page: 1,
        },
        data: allComm.map((community) => new JoinedCommunityDTO(community)),
      },
    });
  } catch (error) {
    res.send({
      status: false,
      message: "something is happen",
    });
  }
};
const createCommunity = async (req, res) => {
  try {
    const { name } = req.body;
    const check = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    if (check) {
      const checkCommunity = await communityModel.findOne({
        slug: slugify(name),
      });
      if (checkCommunity) {
        return res.send({
          status: false,
          message: "community already created",
        });
      } else {
        const cummunityInfo = await communityModel.create({
          name,
          slug: slugify(name),
          owner: check._id,
        });

        res.send({
          status: true,
          content: {
            data: new CreateCommunity(cummunityInfo),
          },
        });
      }
    } else {
      res.send({
        status: false,
        message: "bad request",
      });
    }
  } catch (error) {
    res.send({
      status: false,
      message: "something is happen",
    });
  }
};
const getAllMembers = async (req, res) => {
  try {
    const communityInfo = await communityModel.findOne({
      slug: slugify(req.params.id),
    });
    const allMember = await memberMode
      .find({ community: communityInfo._id.toHexString() })
      .populate({ path: "user", select: "id name" })
      .populate({ path: "role", select: "name id" });

    res.send({
      status: true,
      content: {
        meta: {
          total: allMember.length,
          pages: Math.floor(allMember.length / 10) + 1,
          page: 1,
        },
        data: allMember.map((data) => new AllMember(data)),
      },
    });
  } catch (error) {
    res.send({
      status: false,
      message: "something is happen",
    });
  }
};
const getMyOwnCommunity = async (req, res) => {
  try {
    const check = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const allOwnCommunities = await communityModel.find({ owner: check._id });
    res.send({
      status: true,
      content: {
        meta: {
          total: allOwnCommunities.length,
          pages: Math.floor(allOwnCommunities.length / 10) + 1,
          page: 1,
        },
        data: allOwnCommunities.map((data) => new MyCommunity(data)),
      },
    });
  } catch (error) {
    res.send({
      status: false,
      message: "something is happen",
    });
  }
};
const getMyJoinedCommunity = async (req, res) => {
  try {
    const userId = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const allCommunity = await memberMode.find({ user: userId._id }).populate({
      path: "community",
      populate: { path: "owner", select: "_id name" },
    });

    res.send({
      status: true,
      content: {
        meta: {
          total: allCommunity.length,
          pages: Math.floor(allCommunity.length / 10) + 1,
          page: 1,
        },
        data: allCommunity.map(
          ({ community }) => new JoinedCommunityDTO(community)
        ),
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: "something is happen",
    });
  }
};
module.exports = {
  allCommunity,
  createCommunity,
  getAllMembers,
  getMyOwnCommunity,
  getMyJoinedCommunity,
};
