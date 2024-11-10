const Comment = require("../models/comment.model");
const { getAuth } = require("@clerk/express");
module.exports = {
  getComments: async (req, res) => {
    const { userId } = getAuth(req);
    const commentList = await Comment.find().sort({ created_at: "desc" });
    const commentOutput = commentList.map((comment) => {
      const commentJson = comment.toJSON();
      return {
        ...commentJson,
        canDelete: commentJson.user_id === userId,
      };
    });
    res.json(commentOutput);
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
  deleteComment: async (req, res) => {
    const { userId } = getAuth(req);
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment || comment.user_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await Comment.deleteOne({ _id: id });
    res.json(comment);
  },
};
