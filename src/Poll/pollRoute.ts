import { Router, json } from "express";
import getDbConnection from "../Database";
import Poll from "./Poll";

const router = Router();
router.use(json());
router.get("/", async (req, res) => {
  try {
    const dbConnection = getDbConnection();
    const polls = await dbConnection.getPolls();
    res.send(JSON.stringify(polls));
  } catch {
    res.status(500);
    res.send("Could not load polls");
  }
});
router.get("/:pollId", async (req, res) => {
  try {
    const pollId = parseInt(req.params.pollId, 10);
    const dbConnection = getDbConnection();

    const poll = await dbConnection.getQuestion(pollId);
    res.send(JSON.stringify(poll));
  } catch {
    res.status(500);
    res.send("Could not load poll");
  }
});
router.post("/", async (req, res) => {
  try {
    const poll = req.body as Poll;
    const dbConnection = getDbConnection();
    const writtenPoll = await dbConnection.createPoll(poll);
    res.send(JSON.stringify(writtenPoll));
  } catch {
    res.status(500);
    res.send("Could not write poll");
  }
});

export default router;
