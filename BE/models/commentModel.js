const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postID: {
      type: String,
      required: true,
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

//per scrivere i post si usa l'editor di bootstrap

module.exports = mongoose.model("commentModel", CommentSchema, "comments");
