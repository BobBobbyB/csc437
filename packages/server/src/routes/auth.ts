import express, { Request, Response } from "express";
import Auth from "../services/auth-svc";

const router = express.Router();

// signup
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.signup(username, password);
    res.status(201).json({ id: user._id, username: user.username });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const data = await Auth.login(username, password);
    res.json(data);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
});

export default router;
