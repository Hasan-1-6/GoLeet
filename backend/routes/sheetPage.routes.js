import express from "express";
import verifyToken from './../middleware/verifyToken.js'
import getSheetPage from "../controllers/sheetpage/getSheetPage.controller.js";
import queryLeetcode from "../controllers/sheetpage/queryLeetcode.controller.js";

import updateSheetData from "../controllers/sheetpage/updateSheetdata.controller.js";

const router = express.Router()

router.get('/queryLC', queryLeetcode)
router.get('/:sheetId', verifyToken, getSheetPage)
router.post('/updateSheet', verifyToken, updateSheetData)

export default router
