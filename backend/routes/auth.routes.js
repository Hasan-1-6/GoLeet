import registerUser from './../controllers/auth/register.controller.js'
import getLoginDetails from './../controllers/auth/login.controller.js'
import verifyToken from './../middleware/verifyToken.js'
import userLogOut from './../controllers/auth/logout.controller.js'
import express from "express";



 const router = express.Router()


 router.post("/register", registerUser);
 router.get("/verify", verifyToken, (req, res) => res.status(200).json({message : "Verified Succesfully"}));
 router.post("/login", getLoginDetails);
 router.get("/logout", userLogOut)


 export default router;