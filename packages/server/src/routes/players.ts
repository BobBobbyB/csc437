import express, { Request, Response } from "express";
import Players from "../services/player-svc";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const players = await Players.index();
  res.json(players);
});

router.get("/:userid", async (req: Request, res: Response) => {
  const player = await Players.get(req.params.userid);
  if (!player) return res.status(404).end();
  res.json(player);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newPlayer = await Players.create(req.body);
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:userid", async (req: Request, res: Response) => {
  const updated = await Players.update(req.params.userid, req.body);
  if (!updated) return res.status(404).end();
  res.json(updated);
});

router.delete("/:userid", async (req: Request, res: Response) => {
  await Players.remove(req.params.userid);
  res.status(204).end();
});

export default router;
