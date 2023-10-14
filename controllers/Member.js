const jwt = require("jsonwebtoken");
const { communityModel } = require("../module/Community");
const { memberMode } = require("../module/Member");
const addMember = async (req, res) => {
  try {
    const { community, user, role } = req.body;
    const check = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const validateOwner = await communityModel
      .findOne({ _id: community })
      .populate("owner", "id");

    if (check._id == validateOwner.owner._id.toHexString()) {
      const allCommunityMember = await memberMode.find({ community });
      for (var i = 0; i < allCommunityMember.length; i++) {
        if (allCommunityMember[i].user == user) {
          return res.send({
            status: false,
            message: "user already added",
          });
        }
      }
      const memberInfo = await memberMode.create({ community, user, role });

      res.send({
        status: true,
        contnet: {
          data: {
            id: memberInfo._id,
            community: memberInfo.community,
            user: memberInfo.user,
            role: memberInfo.role,
            created_at: memberInfo.createdAt,
          },
        },
      });
    } else {
      res.send({
        status: false,
        message: "NOT_ALLOWED_ACCESS",
      });
    }
  } catch (error) {
    res.send({
      status: false,
      message: "something is happen",
    });
  }
};
const deleteMember = async (req, res) => {
  try {
    const check = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    if (check) {
      const validateOwner = await memberMode
        .findById(req.params.id)
        .populate("community", "id");
      const ownerInfo = await communityModel
        .findById(validateOwner.community._id.toHexString())
        .populate("owner", "id");

      if (check._id == ownerInfo.owner._id.toHexString()) {
        const allCommunityMember = await memberMode.findByIdAndDelete(
          req.params.id
        );
        if (allCommunityMember) {
          res.send({
            status: true,
          });
        } else {
          res.send({
            status: false,
          });
        }
      } else {
        res.send({
          status: false,
          message: "NOT_ALLOWED_ACCESS",
        });
      }
    } else {
      res.send({
        status: false,
        message: "NOT_ALLOWED_ACCESS",
      });
    }
  } catch (error) {
    res.send({
      status: false,
      message: "something is happen",
    });
  }
};
module.exports = { addMember, deleteMember };
