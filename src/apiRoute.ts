import {Router} from "express";
import pollRouter from './Poll/pollsRoute'

const router = Router();
router.use('/polls', pollRouter);

export default router;