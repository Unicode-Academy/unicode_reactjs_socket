const Comment = require("../models/comment.model");
module.exports = {
  getComments: async (req, res) => {
    const commentList = await Comment.find();
    res.json(commentList);
  },
};
