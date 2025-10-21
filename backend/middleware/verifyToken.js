import User from "../models/user.js";
import jwt from 'jsonwebtoken'

export default async function authMiddleware(req, res, next){
    const token = req.cookies.token
    //returns some stuff like id and email 
    if(!token) return res.status(401).json({message : "token not found, Please relogin"})
        
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const findUser = await User.findById(decodedToken.id)
        if(!findUser) return res.status(401).json({message : "jwt auth failed, Please relogin"})
        req.user = findUser;
        // note how we send findUser here, IT CONTAINS THE STUFF FROM DATABASE, ITS user._id the one that db stores
        // attach the whole user here DONT QUERY IT AGAIN IN THE CONTROLLER FUNCTION
        next();
        
    } catch (err) {
        return res.status(403).json({message : "Token could not be verified, Please login again"})
    }
}