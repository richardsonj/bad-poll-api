import { Router, json } from "express";
import getDbConnection from "../Database";
import Option from "./Option";

const router = Router();
router.use(json());
router.get("/:optionId", async (req, res) => {
  try {
    const optionId = parseInt(req.params.optionId, 10);
    const dbConnection = getDbConnection();
    const option = await dbConnection.getOption(optionId);
    res.send(JSON.stringify(option));
  } catch {
    res.status(500);
    res.send("Could not load option");
  }
});
router.post("/", async (req, res) => {
  try {
    const option = req.body as Option;
    const dbConnection = getDbConnection();
    const writtenOption = await dbConnection.createOption(option);
    res.send(JSON.stringify(writtenOption));
  } catch {
    res.status(500);
    res.send("Could not write option");
  }
});

export default router;
