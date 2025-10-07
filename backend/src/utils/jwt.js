import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();
const JWT_SECRET = process.env.JWT_SECRET;
console.log('jwt secret: ', JWT_SECRET);
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export { generateToken, verifyToken };
