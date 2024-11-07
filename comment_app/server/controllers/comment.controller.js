const Comment = require("../models/comment.model");
module.exports = {
  getComments: async (req, res) => {
    const commentList = await Comment.find().sort({ created_at: "desc" });
    res.json(commentList);
  },
  createComment: async (req, res) => {
    const { user_id, name, content } = await req.body;
    const comment = await Comment.create({
      user_id,
      name,
      content,
      created_at: new Date(),
    });
    res.status(201).json(comment);
  },
};
