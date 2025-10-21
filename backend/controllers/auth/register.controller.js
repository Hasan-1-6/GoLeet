import isEmail from "validator/lib/isEmail.js";
import User from "../../models/user.js";
import bcrypt from "bcrypt";


export default async function registerUser(req, res){
    const {name, email, password} = req.body;
    if(!name)   return res.status(400).json({ message : 'Invalid Name'});
    if(!email) return res.status(400).json({ message : 'Invalid Email'});
    if(!password) return res.status(400).json({ message : 'Invalid password'});

    if(!isEmail(email)){
        return res.status(400).json({ message : 'Invalid Email'});
    }
    if(password.length < 6) return res.status(400).json({message : 'Password is too short'})

    try{
        const userExists = await User.findOne({email})
        if(userExists) return res.status(400).json({message : 'User with email already exists'})
        
        const salt = await bcrypt.genSalt(6);

        const hashedPass = await bcrypt.hash(password, salt);
        const createUser = new User({
            name : name,
            email : email,
            password : hashedPass
        })
        //auto generated a userId by the name _id like {_id : vkSbEowb}
        await createUser.save();
     

        return res.status(200).json({message : 'Registered Succesfully !'})
    }
    catch(err){
        return res.status(500).json({message : 'Internal Server error occured'})
    }   
}



   // const token = generateToken({
        //     id : createUser._id.toString(),
        //     email : createUser.email,
        // });

        //inside token it is only ID

        // res.cookie('token', token, {
        //     httpOnly : true,
        //     sameSite : "strict",
        //     secure : false, //for dev
        //     maxAge : 60 * 60 * 1000
        // });