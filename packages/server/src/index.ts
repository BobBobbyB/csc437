import express, { Request, Response } from "express";
import { connect } from "./services/mongo.js";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "../proto/dist";

app.use(express.static(staticDir));

connect("nba");

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
