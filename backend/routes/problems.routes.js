import { Router } from "express"
import { getproblems } from "../controllers/problems.controller.js";
import protectroute from '../middleware/protectroute.js'
const router = Router();

router.get('/getproblems',protectroute,getproblems);

export default router;