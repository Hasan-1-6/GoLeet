import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

export default function DeleteSheetPop(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  async function deleteSheet(){
    try{
        const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/sidebar/deleteSheet`,{
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            method : "POST",
            body : JSON.stringify({
                sheetToDelete : props.sheetId
            })
        })

        if(!resp.ok){
            toast.error("Some error occured pls try later")
            return;
        }
        toast.success("Sheet Deleted Succesfully");
        props.setUserSheets(prev => prev.filter(obj => obj.id != props.sheetId) )
        props.setdeleteSheetPopUp(false);
        if(id == props.sheetId) navigate('/')
    }
    catch(err){
        toast.error("Some error occured while deleting" + err.message)
    }
  }

  
  return (
        <div className='absolute z-[999] h-screen w-screen bg-black/60  backdrop-blur-[2px] flex justify-center items-center'  onClick={() => props.setdeleteSheetPopUp(false)}>
      <div className='bg-[#1E2127] rounded-xl border-teal-400 border-2 p-6 flex flex-col items-center gap-4 min-h-[20%] w-[80%] sm:w-[80%] md:w-[60%] lg:w-[40%]' onClick={e => e.stopPropagation()}>
        <p className='text-[#EEEEEE] font-semibold pl-2 self-start text-xl sm:text-2xl'> '{props.sheetName}' will be permanently deleted.</p>
        <div className='w-full flex justify-end mt-auto'>
          <button 
          onClick={() => props.setdeleteSheetPopUp(false)}
          className='cursor-pointer bg-[#EEEEEE] h-8 w-20 rounded-sm shadow-2xl active:scale-95'>
          Cancel
        </button>
        <button onClick={deleteSheet}  className='cursor-pointer bg-red-500 h-8 w-20 ml-2 font-semibold rounded-sm shadow-2xl active:scale-95' >
          Delete
        </button>
        </div>

      </div>
    </div>
  )
}

