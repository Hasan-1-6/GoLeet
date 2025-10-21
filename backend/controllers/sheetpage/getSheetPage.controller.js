import sheet from "../../models/sheet.js";
export default async function(req, res){
    const userData = req.user;
    const sheetId = req.params.sheetId;
    //returns the sheet page along with owner to check who owns

    try {
        const sheetData = await sheet.findOne({sheetId : sheetId})
        if(!sheetData) return res.status(404).json({message : "Sheet not found :O"});

        
        const sheetObj = sheetData.toObject();
        sheetObj.owner = (String(sheetData.userId) === String(userData._id)) ? true : false;
        return res.status(200).json(sheetObj)

    } catch (err) {
        return res.status(500).json({message : 'Some error occured while fetching sheets :('})
    }
}

//scrap this whole shit man
//hold up it do be working, PAUSE THE EXTERMINATION !!