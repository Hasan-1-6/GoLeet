import problem from "../../models/problem.js";
// {
//     "user_name": "",
//     "num_solved": 0,
//     "num_total": 3677,
//     "ac_easy": 0,
//     "ac_medium": 0,
//     "ac_hard": 0,
//     "stat_status_pairs": [
//         {
//             "stat": {
//                 "question_id": 4043,
//                 "question__article__live": null,
//                 "question__article__slug": null,
//                 "question__article__has_video_solution": null,
//                 "question__title": "Find Zombie Sessions",
//                 "question__title_slug": "find-zombie-sessions",
//                 "question__hide": false,
//                 "total_acs": 187,
//                 "total_submitted": 257,
//                 "frontend_question_id": 3673,
//                 "is_new_question": true
//             },
//             "status": null,
//             "difficulty": {
//                 "level": 3
//             },
//             "paid_only": false,
//             "is_favor": false,
//             "frequency": 0,
//             "progress": 0
//         },
//         {
//             "stat": {
//                 "question_id": 4036,
//                 "question__article__live": null,
//                 "question__article__slug": null,
//                 "question__article__has_video_solution": null,
//                 "question__title": "Sum of Weighted Modes in Subarrays",
//                 "question__title_slug": "sum-of-weighted-modes-in-subarrays",
//                 "question__hide": false,
//                 "total_acs": 96,
//                 "total_submitted": 140,
//                 "frontend_question_id": 3672,
//                 "is_new_question": true
//             },
//             "status": null,
//             "difficulty": {
//                 "level": 2
//             },
//             "paid_only": true,
//             "is_favor": false,
//             "frequency": 0,
//             "progress": 0
//         },

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
            // return res.status(401).json({message : "Leetcode didnt resp"})
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
        // next();
    }catch(err){
        console.log(err.message)
        // return res.status(500).json({message : "Some error occured when updating problem list" + err.message})
    }
}