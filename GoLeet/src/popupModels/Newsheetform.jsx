import { useState } from "react"
import React from 'react'
import toast from "react-hot-toast"


function Newsheetform(props) {
  const [Title, setTitle] = useState('')
  const [Desc, setDesc] = useState('')
  async function createSheet(){
    if(Title == ''){
      toast.error(`Title cannot be empty`);
      return;
    }
    if(Desc == ''){
      toast.error(`Description cannot be empty`);
      return;
    }

    try{
      const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/sidebar/createSheet`,{
        method : "POST",
        credentials : "include",
        body : JSON.stringify({
          title : Title,
          desc : Desc,
        }),
        headers : {
          "Content-Type" : "application/json",
        },
      })
      const data = await resp.json()
      if(!resp.ok){
        toast.error(`Some error occured : ${data.message}`)
        return;
      }
      
      //imma eat maggi for lunch today fuck the sodium intake
      //navigate sheet.jsx to the newly created shit lmao
      //create pop up for logout, use for delete too
      // setup navigation for sheet page first and foremost
      

      props.setUserSheets(prev => [...prev, {"title" : Title, 'id' : data.sheetId}])
    }
    catch(err){
      toast.error(`Some error occured while making sheet : ${err.message}`);
    }
    props.setPopUp(prev => !prev)
  }
  return (
    <div className='absolute z-[999] h-screen w-screen backdrop-blur-[2px] bg-black/60  flex justify-center items-center' onClick={() => props.setPopUp(prev =>{console.log("did the thing boss")})}>
      <div className='bg-[#1E2127] rounded-xl border-teal-400 border-2 p-6 flex flex-col items-center gap-4 min-h-[30%] w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%]' onClick={e => e.stopPropagation()}>
        <p className='text-[#EEEEEE] font-bold pl-5 self-start text-xl sm:text-3xl'>Create New Sheet!</p>
        <input type="text" className='w-[100%] bg-[#15181D] focus:outline-none focus:ring-none h-12  px-4 text-lg text-[#EEEEEE]' value={Title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Sheet Title'/>
        <textarea type="text" className='w-[100%] bg-[#15181D] focus:outline-none focus:ring-none py-2 px-4  resize-none text-[#EEEEEE] h-25' value={Desc} onChange={(e) => setDesc(e.target.value)} placeholder='Enter Sheet Description'/>
        <div className='w-full flex justify-end'>
          <button onClick={() => props.setPopUp(prev => !prev)}
          // done assdhasd
          className='cursor-pointer bg-[#EEEEEE] h-10 w-20 rounded-sm shadow-2xl active:scale-95'>
          Cancel
        </button>
        <button  className='cursor-pointer bg-teal-400 h-10 w-20 ml-2 font-semibold rounded-sm shadow-2xl active:scale-95' onClick={createSheet}>
          Create
        </button>
        </div>

      </div>
    </div>

  )
}

export default Newsheetform