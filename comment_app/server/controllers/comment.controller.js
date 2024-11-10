const Comment = require("../models/comment.model");
const { getAuth, clerkClient } = require("@clerk/express");
module.exports = {
  getComments: async (req, res) => {
    const { userId } = getAuth(req);
    const commentList = await Comment.find().sort({ created_at: "desc" });
    const commentOutput = commentList.map((comment) => {
      const commentJson = comment.toJSON();
      return {
        ...commentJson,
        canDelete: commentJson.user_id === userId,
        canEdit: commentJson.user_id === userId,
      };
    });
    res.json(commentOutput);
  },
  getComment: async (req, res) => {
    const { id } = req.params;
    const { userId } = getAuth(req);
    const comment = await Comment.findById(id);
    if (!comment || comment.user_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(comment);
  },
  createComment: async (req, res) => {
    const { content } = await req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const { userId } = getAuth(req);
    const user = await clerkClient.users.getUser(userId);

    const comment = await Comment.create({
      user_id: userId,
      name: user.fullName,
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
  updateComment: async (req, res) => {
    const { id } = req.params;
    const { userId } = getAuth(req);
    const { content } = await req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    let comment = await Comment.findById(id);
    if (!comment || comment.user_id !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await comment.updateOne({ content });
    comment = comment.toJSON();
    comment.content = content;
    return res.json(comment);
  },
};
