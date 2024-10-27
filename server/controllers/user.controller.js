const { object, string } = require("yup");
const User = require("../models/user.model");
module.exports = {
  getUsers: async (req, res) => {
    const users = await User.find();
    res.json(users);
  },
  findUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.json(user);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const userSchema = object({
        name: string().required(),
        email: string().required().email(),
      });
      const body = await userSchema.validate(req.body, {
        abortEarly: false,
      });
      const user = await User.create(body);
      return res.status(201).json({ user });
    } catch (e) {
      if (e.inner) {
        const errors = Object.fromEntries(
          e.inner.map(({ path, message }) => [path, message])
        );
        return res.status(400).json({ errors });
      }
      return res.status(500).json({ error: e.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await User.updateOne({ _id: id }, body);
      if (user.acknowledged) {
        return res.json({
          success: true,
          message: "Update success",
        });
      }
      return res.json({
        success: false,
        message: "Update failed",
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.deleteOne({ _id: id });
      if (user.acknowledged) {
        return res.json({
          success: true,
          message: "Delete success",
        });
      }
      return res.json({
        success: false,
        message: "Delete failed",
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
};
