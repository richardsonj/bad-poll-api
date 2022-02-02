import { Router, json } from "express";
import optionRoute from "../Option/optionRoute";
import getDbConnection from "../Database";
import Question from "./Question";

const router = Router();
router.use(json());
router.get("/", async (req, res) => {
  try {
    const pollId = parseInt(req.query.pollId as string, 10);
    const dbConnection = getDbConnection();
    const questions = await dbConnection.getQuestions(pollId);
    res.send(JSON.stringify(questions));
  } catch {
    res.status(500);
    res.send("Could not load questions");
  }
});
router.get("/:questionId", async (req, res) => {
  try {
    const questionId = parseInt(req.params.questionId, 10);
    const dbConnection = getDbConnection();
    const question = await dbConnection.getQuestion(questionId);
    res.send(JSON.stringify(question));
  } catch {
    res.status(500);
    res.send("Could not load question");
  }
});
router.post("/", async (req, res) => {
  try {
    const question = req.body as Question;
    const dbConnection = getDbConnection();
    const writtenQuestion = await dbConnection.createQuestion(question);
    res.send(JSON.stringify(writtenQuestion));
  } catch {
    res.status(500);
    res.send("Could not write question");
  }
});

export default router;
