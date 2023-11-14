const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: Array,
      required: true,
    },
    cover: {
      type: String,
      required: false,
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
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    coord: {
      lat: { type: String, required: true },
      lon: { type: String, required: true },
    },
  },
  { timestamps: true, strict: true }
);

//per scrivere i post si usa l'editor di bootstrap

module.exports = mongoose.model("postModel", PostsSchema, "TravelPosts");
