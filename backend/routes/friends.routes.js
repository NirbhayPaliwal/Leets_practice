import express from 'express';
import protectroute from '../middleware/protectroute.js';
import {addfriend,getfriend,getsubmissions} from '../controllers/friend.controller.js'
const router = express.Router();
/*
    add friends
    get a friends submissions 
    get friends -> get friends submission
*/
router.get('/add/:id',protectroute,addfriend);
router.get('/get',protectroute,getfriend);
router.get('/submissions',protectroute,getsubmissions);

export default router;