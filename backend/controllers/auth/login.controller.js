import User from "../../models/user.js";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

function generateToken(user){
    return jwt.sign(
        {
            id : user.id,
            email : user.email,
        },
        process.env.SECRET_KEY,
        {   expiresIn : '1h'   }
    )
}

export default async function loginUser(req, res){
    if(!req.body) return res.status(400).json({message : "Credentials not provided"})
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message : "Credentials not provided"})

    if(!isEmail(email)) return res.status(400).json({message : 'Email is not valid'});

    try{
        const findUser = await User.findOne({email : email})
        if(!findUser) return res.status(400).json({message : 'User not found'})
        const matchPass = await bcrypt.compare(password, findUser.password);
        if(!matchPass) return res.status(400).json({message : 'Password does not match'})
        //when we login we should have our jwt toekns set not at registration 
        const token = generateToken({
            id : findUser._id,
            email : findUser.email,
        });

        //inside token it is only ID
        res.cookie('token', token, {
            httpOnly : true, //only to be rw by http request not js methods
            sameSite : "none", //restrict cookies from being sent
            secure : true, //for dev its false, true for production
            maxAge : 60 * 60 * 1000

        });
        console.log("Token set !!")
        return res.status(200).json({message : 'Logged In Succesfully !'})
    }
    catch(err){
        return res.status(500).json({message : ' Some error occured :( '});
    }
}
