const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

var roleModel = mongoose.model("role", roleSchema);
module.exports = { roleModel };
