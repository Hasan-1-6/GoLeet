import Sheet from '../../models/sheet.js';
import User from '../../models/user.js';
import {nanoid} from "nanoid"
import updateProblemList from '../updateProbList/updateProblems.js';

export default async function createSheet(req, res){
    const user = req.user;
    const title = req.body.title;
    const desc = req.body.desc;

    if(title == '') return res.status(404).json({message : "Empty Title" })
    if(desc == '') return res.status(404).json({ mssage : "Empty description"})
    const sheetId = nanoid(6);
    try{
        const newSheet = new Sheet({
            sheetId : sheetId,
            title : title,
            description : desc,
            userId : user._id,
            author : user.name
        })
        await newSheet.save();
        //add this sheetId to user and save it
        await User.findByIdAndUpdate(
            user._id,
            {$push : { sheetsMade : sheetId }},
        )
        return res.status(200).json({message : "Sheet created", sheetId : sheetId});
    }
    catch(err){
        return res.status(500).json({message : "Server crashed"})
    }
}