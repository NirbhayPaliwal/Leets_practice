import express from 'express';
import {buildcontest,getcontest,participate} from "../controllers/contest.controller.js"
import protectroute from "../middleware/protectroute.js"
const router = express.Router();
/*
    fetch own question
    create a contest   
    get past contests
*/
router.post("/build",protectroute,buildcontest);
router.get("/get/:id",protectroute,getcontest);
router.get("/participate/:id", protectroute, participate);
export default router;
