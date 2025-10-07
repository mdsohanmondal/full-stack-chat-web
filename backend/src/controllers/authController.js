import User from '../models/UserModel.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing input fields' });
    }

    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return res.status(400).json({ message: 'Email already exist' });
    }

    const user = await User.create({ email, password, username });
    const token = generateToken({ id: user._id, email: user.email, username: user.username });

    return res.status(201).json({ user, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing input fields' });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Email or password wrong' });
    }

    const token = generateToken({ id: user._id, email: user.email, username: user.username });
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
