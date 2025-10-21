import sheet from '../../models/sheet.js'
//only need the name and id of the sheets
export default async function getSheets(req, res){
    
    const userData = req.user;
    const sheetIdArray = userData.sheetsMade
    
    try {
        const sheets = await sheet.find({sheetId : {$in : sheetIdArray}});

        const result = sheets.map((elem) => {
            return {
                id : elem.sheetId,
                title : elem.title
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message : 'Couldnt connect to server'})
    }

}