const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: mongoose.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

var communityModel = new mongoose.model("community", communitySchema);
module.exports = { communityModel };
