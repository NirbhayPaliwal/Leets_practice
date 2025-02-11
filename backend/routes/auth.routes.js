import express from 'express';
import { login, signup ,checkauth } from "../controllers/auth.controller.js";
import protectroute from '../middleware/protectroute.js';

const router = express.Router();

router.post("/login",login);
router.post("/signup", signup);
router.get("/check",protectroute,checkauth);

export default router;