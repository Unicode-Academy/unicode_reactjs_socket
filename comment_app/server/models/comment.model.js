const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user_id: String,
  name: String,
  content: String,
  created_at: String,
});
const Comment = mongoose.model("Comment", schema);
module.exports = Comment;
