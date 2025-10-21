import sheet from "../../models/sheet.js";
import User from "../../models/user.js";

export default async function deleteSheet(req, res){
    const userData = req.user;
    const sheetToDelete = req.body.sheetToDelete;
    
    if (!sheetToDelete) {
        return res.status(400).json({ message: "No sheet specified to delete" });
    }

    try{
        await User.updateOne({_id : userData._id}, {$pull : {sheetsMade : sheetToDelete}})
        await sheet.deleteOne({sheetId : sheetToDelete})
        
        res.status(200).json({message : "Sheet deleted succesfully"})
    }
    catch(err){
        res.status(500).json({message : "Internal error occured"})
    }

}