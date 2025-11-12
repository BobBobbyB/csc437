import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"; // will add real secret in .env
const SALT_ROUNDS = 10;

async function signup(username: string, password: string) {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({ username, password: hashed });
  return user.save();
}

async function login(username: string, password: string) {
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: "2h" });
  return { token, username };
}

function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export default { signup, login, verifyToken };
