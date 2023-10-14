const AllRole = require("../dtos/AllRole");
const { roleModel } = require("../module/Role");

const createRole = async (req, res) => {
  const { name } = req.body;
  if (name.length < 2) {
    return res.send({
      status: false,
      message: "role name size must be greater than 2",
    });
  }
  const checkPresent = await roleModel.findOne({ name });
  if (checkPresent) {
    return res.send({
      status: false,
      message: "role name already exit",
    });
  } else {
    var createRole = await roleModel.create({ name });
    return res.send({
      status: true,
      contnet: {
        data: new AllRole(createRole),
      },
    });
  }
};
const getAllRole = async (req, res) => {
  try {
    const getALLRole = await roleModel.find({});

    res.send({
      status: true,
      content: {
        meta: {
          total: getALLRole.length,
          pages: Math.floor(getALLRole.length / 10) + 1,
          page: 1,
        },
        data: getALLRole.map((newdata) => new AllRole(newdata)),
      },
    });
  } catch (error) {
    res.send({
      status: false,
      message: "something is wrong",
    });
  }
};
module.exports = { getAllRole, createRole };
