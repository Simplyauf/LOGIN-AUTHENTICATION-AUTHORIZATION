const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      required: [true, "pls enter a username"],
    },
    password: {
      type: String,
      required: [true, "pls enter a password"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
