const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user_id: String,
  name: String,
  content: String,
  created_at: Date,
});
const Comment = mongoose.model("Comment", schema);
module.exports = Comment;
