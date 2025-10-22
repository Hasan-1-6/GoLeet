import problem from "../../models/problem.js";

const diffMap = {1 : "easy", 2 : "medium", 3 : "hard"} 


export default async function updateProblemList(req, res, next){
    try{
        const resp = await fetch('https://leetcode.com/api/problems/all',{
            method : "GET",
            headers : {
                "Content-type" : "application/json"
            }
        })
        if(!resp.ok){
            console.log("resp was not okay while setting sheet")
            return res.status(401).json({message : "Leetcode didnt resp"})
        }
        const allProb = await resp.json();
        const newProbList = allProb.stat_status_pairs.map(e => {
            return {
                title : e.stat.question__title,
                slug : e.stat.question__title_slug,
                "question_id" : e.stat.question_id.toString(),
                difficulty : diffMap[e.difficulty.level]
            }
        })
        try{
            await problem.collection.drop();
        }catch(err){
            console.log("collection already empty")
        }
        await problem.insertMany(newProbList);
        console.log(`succesfully insert list`)
        console.log(newProbList);
        console.log('newlist updated')
        return res.status(200).json({message : "Updated sheetlists"})
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message : "Some error occured when updating problem list" + err.message})
    }
}