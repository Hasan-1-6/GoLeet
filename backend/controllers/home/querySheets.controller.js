import sheet from "../../models/sheet.js";

export default async function querySheets(req, res){
    
    const userInput = req.body.input;
    let page = Number(req.body.page);
    const limit = Number(process.env.PAGELIMIT);
    const sortBy = Number(req.body.sortBy);
    const sortOption = sortBy == 0 ? { title : 1} : {_id : -1}
    if(page < 1) page = 1;
    if(page > 200) return res.status(403).json({message : "invalid page"});

    let sheetList;
    try{
        sheetList = await sheet.find({title : {$regex : `${userInput}`, $options : 'i'}}).sort(sortOption).lean();

        sheetList.forEach(elem => {
            const lowerTitle = elem.title.toLowerCase();
            const lowerInp = userInput.toLowerCase();
            elem.relevance = lowerTitle.indexOf(lowerInp);
        })
        
        sheetList.sort((a, b) =>{
            if(a.relevance === b.relevance)
                return 0;
            return a.relevance - b.relevance;
        })

        const newData = {
            sheets : sheetList.slice((page-1)*limit, page*limit),
            hasMore : sheetList.length > page*limit ? true : false,
        }

        return res.status(200).json(newData)
    }catch(err){
        
        return res.status(500).json({message : 'couldnt fetch sheet list from backend'})
    }
}