import User from '../models/UserModel.js';
export const getUsers = async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await User.findOne({ _id: userId });
      return res.status(200).json(user);
    } else {
      const users = await User.find();
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};
