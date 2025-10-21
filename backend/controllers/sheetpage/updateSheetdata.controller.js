import sheet from "../../models/sheet.js";


export default async function updateSheetData(req, res){
    const userData = req.user
    const newSheetData = req.body.sheetData

    if(userData._id != newSheetData.userId){
        res.status(401).json({ messaage : "Unauthorized action for current user"});
        return;
    }
    //remove owner field first
    try{
        const {owner, ...strippedSheetData} = newSheetData
        await sheet.replaceOne({sheetId : newSheetData.sheetId}, strippedSheetData);
        console.log('sheetdata updated succesfully');
        return res.status(200).json({message : "sheet udpated succesfully"})
    }
    catch(err){
        return res.status(500).json({message : "sheet couldnt be updated"});
    }

    
}