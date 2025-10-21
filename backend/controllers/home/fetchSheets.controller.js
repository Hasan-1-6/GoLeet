import sheet from "../../models/sheet.js";



export default async function fetchSheets(req, res){
    let page = Number(req.body.page);
    const limit = Number(process.env.PAGELIMIT);
    const sortBy = Number(req.body.sortBy);
    
    const sortOption = sortBy == 0 ? { title : 1} : {_id : -1}
    if(page < 1) page = 1;
    if(page > 200) return res.status(401).json({message : "invalid page"});
    const skipPage = (page-1)*limit;
    try{    
        const listOfSheets = await sheet.find().sort(sortOption).skip(skipPage).limit(limit+1)
        if(listOfSheets.length == 0) return res.status(200).json(listOfSheets)
        
        let newData = listOfSheets.map((elem) => ({
            sheetId : elem.sheetId,
            description : elem.description,
            author : elem.author,
            title : elem.title,
            numOfQues : elem.numOfQues,
            easy : elem.easy,
            medium : elem.medium,
            hard : elem.hard,            
        })
        )
        
        

        newData = { 
            sheets : newData.slice(0, limit),
            hasMore : listOfSheets.length > limit
        }
        return res.status(200).json(newData)
    }
    catch(err){
        return res.status(500).json({message : "couldnt fetch all sheets some error occured"})
    }
}
