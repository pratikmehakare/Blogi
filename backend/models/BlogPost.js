const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    author: { type: String, },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
