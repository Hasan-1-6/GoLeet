import problem from "../../models/problem.js";


export default async function queryLeetcode(req, res){
    const userInput = req.query.input;
    
    let problemList;
    try{
        if(!isNaN(Number(userInput))){ //inp is all numbers
            problemList = await problem.find({question_id : { $regex : `^${userInput}`}}).limit(5).lean();
        }
        else{
            problemList = await problem.find({ title : { $regex : userInput, $options : 'i' }}).lean();
            problemList.forEach(elem => {
                const lowerTitle = elem.title.toLowerCase()
                const lowerInp = userInput.toLowerCase()
                elem.relevance= lowerTitle.indexOf(lowerInp)
            })
            problemList.sort((a, b) => {
                if(a.relevance === b.relevance)
                    return a.question_id - b.question_id;
                return a.relevance - b.relevance
            });
            problemList = problemList.slice(0, 5);
        }
        return res.status(200).json(problemList)
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({message : 'couldnt fetch sheet from backend'})
    }
}