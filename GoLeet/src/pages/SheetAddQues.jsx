import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import toast from "react-hot-toast"


export default function SheetAddQues(props){
  const sheetData = props.sheetData

  async function addToSheetData(){  
    if (sheetData.ques.find(p => p.quesId === props.question_id)) {
      toast.error('Question already exists in sheet');
      return;
    }
    //check if sheetdata.ques has any matching ques by question id
    const newSheetData = {
        ...sheetData,
        numOfQues : sheetData.numOfQues+1,
        [props.difficulty] : sheetData[props.difficulty]+1
        ,ques : [
        ...sheetData.ques,
        {
            title: props.title,
            difficulty: props.difficulty,
            url: props.url,
            quesId: props.question_id
        }
        ]
    }
        props.setSheetData(newSheetData)
        try{
        const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/sheet/updateSheet`, {
                method : 'POST',
                credentials : "include",
                body : JSON.stringify({
                sheetData : newSheetData
                }),
                headers :{
                "Content-Type" : "application/json"
                },
            })
            if(!resp.ok){
                toast.error("resp was not okayw hile setttings sheet")
            }
            toast.success("ques added");
        }
        catch(err){
            toast.error("some error ocured while setting sheet to backend", + err.message)
        }
        props.setuserInput('');
    ///TODO TODO TODOTODOTODODOTODOOOOOO TODODOOO
    // wrtie an api in backend to update the passed shit fr fr fr
    //welp time to fix the bike battery 
  }
  const diffcolor = (props.difficulty == 'easy' ? `text-green-400` : (props.difficulty == `medium` ? `text-orange-400` : `text-red-600`));
  return (
    <>
      <div className='w-full py-7 md:pl-10 px-4 md:px-10 flex justify-between '>
        <div className='flex'>
          <h2 className={`${diffcolor} text-md pr-2 md:pr-6`}>●</h2>
          <p className='text-[#EEEEEE] font-semibold'>{props.question_id}. {props.title}</p>
        </div>
        <button onClick={addToSheetData} className='text-[#EEEEEE] cursor-pointer hover:scale-105 transition hover:text-teal-400'> <Plus/> </button>
        {/* onclick add this element to the sheet and show a success msg  */}
        {/*  */}
      </div>
    </>
  )
}

// Black : 	#15181D
//grey : #1E2127
// teal : #76ABAE
// cream : #EEEEEE
// highlight grey : #262A31 