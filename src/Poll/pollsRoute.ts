import { Router, json } from "express";
import getDbConnection from "../Database";
import Poll from "./Poll";

const router = Router();
router.use(json());
router.post("/", async (req, res, next) => {
  const poll = req.body as Poll;
  const dbConnection = getDbConnection();
  try {
    const writtenPoll = await dbConnection.createPoll(poll);
    res.send(JSON.stringify(writtenPoll));
  } catch {
    res.status(500);
    res.send("Could not write poll");
  }
});

export default router;
