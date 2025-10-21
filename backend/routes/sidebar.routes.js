
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import getUserInfo from "../controllers/sidebar/getUserInfo.controller.js";
import getSheets from "../controllers/sidebar/getSheets.controller.js";
import createSheet from "../controllers/sidebar/createSheet.controller.js"
import deleteSheet from "../controllers/sidebar/deleteSheet.controller.js"

const router = express.Router();

router.get("/getUserInfo", verifyToken, getUserInfo)
router.get("/getSheets", verifyToken, getSheets)
router.post("/createSheet", verifyToken, createSheet)
router.post("/deleteSheet", verifyToken, deleteSheet)

export default router