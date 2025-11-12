import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import players from "./routes/players";
import auth from "./routes/auth";
import { requireAuth } from "./middleware/auth";

const app = express();

// global middleware
app.use(express.json());

// config
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "../proto/dist";

// static assets
app.use(express.static(staticDir));

// mongodb
connect("nba");

// routes
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// auth (signup + login)
app.use("/api/auth", auth);

// player REST API (CRUD)
app.use("/api/players", players);

// example protected route (requires valid JWT)
app.get("/api/protected", requireAuth, (req: Request, res: Response) => {
  res.json({
    message: "You are authorized!",
    user: (req as any).user
  });
});

// start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
