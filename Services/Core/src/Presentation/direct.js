import { getMyDirects } from "../Application/direct.js";
import express from 'express';


const router = express.Router();

router.get("/my-directs", getMyDirects);


export default router;