const jwt = require("jsonwebtoken");
const { userModel } = require("../module/User");
const { passwordHash, checkPassword } = require("../util/authUser");
const UserInfo = require("../dtos/User");

const createAccount = async (req, res) => {
  const { name, email, password } = req.body;
  if (name.length < 2) {
    return res.send({
      status: false,
      message: "name length must be greater than 2",
    });
  }
  if (password.length < 6) {
    return res.send({
      status: false,
      message: "password length must be greater than 6",
    });
  }
  var check = await userModel.findOne({ email });
  if (check) {
    return res.send({
      status: false,
      message: "email already exits",
    });
  } else {
    const newpasswrod = await passwordHash(password);
    const userInfo = await userModel.create({
      name,
      email,
      password: newpasswrod,
    });
    const token = await jwt.sign(
      { _id: userInfo._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("access_token", token).send({
      status: true,
      content: {
        data: new UserInfo(userInfo),
        meta: {
          access_token: token,
        },
      },
    });
  }
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    var userInfo = await userModel.findOne({ email });
    if (userInfo) {
      var checkPasswords = await checkPassword(password, userInfo.password);
      if (!checkPasswords) {
        return res.send({
          status: false,
          message: "Wrong passwrod",
        });
      }
      const token = await jwt.sign(
        { _id: userInfo._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      res.cookie("access_token", token);
      res.send({
        status: true,
        content: {
          data: new UserInfo(userInfo),
          meta: {
            access_token: token,
          },
        },
      });
    } else {
      return res.send({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "something is happen",
    });
  }
};
const getMe = async (req, res) => {
  try {
    const check = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const userInfo = await userModel.findOne({ _id: check });
    res.send({
      status: true,
      content: {
        data: new UserInfo(userInfo),
      },
    });
  } catch (error) {
    res.send({
      status: false,
      message: "something is happen",
    });
  }
};
module.exports = { createAccount, userLogin, getMe };
