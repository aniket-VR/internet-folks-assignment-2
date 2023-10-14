const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    community: {
      type: mongoose.ObjectId,
      ref: "community",
    },
    user: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    role: {
      type: mongoose.ObjectId,
      ref: "role",
    },
  },
  { timestamps: true }
);

const memberMode = new mongoose.model("member", memberSchema);
module.exports = { memberMode };
