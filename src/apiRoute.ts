import {Router} from "express";
import optionRoute from "./Option/optionRoute";
import pollRoute from './Poll/pollRoute'
import questionRoute from "./Question/questionRoute";

const router = Router();
router.use('/polls', pollRoute);
router.use('/questions', questionRoute);
router.use('/options', optionRoute);

export default router;