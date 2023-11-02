const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    cover: {
      type: String,
      required: false,
    },
    readTime: {
      value: {
        type: Number,
        default: 60,
        required: false,
      },
      unit: {
        type: String,
        required: false,
        default: "Minutes",
        enum: ["Minuti", "Ore", "Secondi"],
      },
    },
    rate: {
      type: Number,
      required: false,
      default: 1,
    },
    author: {
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

module.exports = mongoose.model("postModel", PostsSchema, "posts");
