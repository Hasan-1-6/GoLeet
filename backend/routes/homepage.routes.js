import express from "express";
import verifyToken from '../middleware/verifyToken.js'
import fetchSheets from "../controllers/home/fetchSheets.controller.js";
import querySheets from "../controllers/home/querySheets.controller.js";


const router = express.Router();

router.post('/fetchSheets', verifyToken, fetchSheets)
router.post('/fetchQuerySheets',verifyToken, querySheets)

export default router