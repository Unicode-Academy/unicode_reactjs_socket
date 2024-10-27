const User = require("../models/user.model");
module.exports = {
  getUsers: async (req, res) => {
    const users = await User.find();
    res.json({ users });
  },
};
