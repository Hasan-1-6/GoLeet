import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function LogoutPop(props) {
  const navigate = useNavigate();
   async function logOut(){
        try{
          const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/auth/logout`, {
            method : "GET",
            credentials : "include"
          })
          navigate('/', {replace : true});
          props.setIsLogged(false)
          props.setUserInfo("")
          toast.success('Logged Out Succesfully')
        }
        catch(err){
          toast.error(`Some error occured`)
        }
    }

  
  return (
        <div className='absolute z-[999] backdrop-blur-[2px] h-screen w-screen bg-black/60  flex justify-center items-center'  onClick={() => props.setLogoutPopUp(false)}>
      <div className='bg-[#1E2127] rounded-xl border-teal-400 border-2 p-6 flex flex-col items-center gap-4 min-h-[20%] w-[80%] sm:w-[80%] md:w-[60%] lg:w-[40%]' onClick={e => e.stopPropagation()}>
        <p className='text-[#EEEEEE] font-semibold pl-2 self-start text-xl sm:text-2xl'>Do you want to logout from GoLeet?</p>
        <div className='w-full flex justify-end mt-auto'>
          <button 
          onClick={() => props.setLogoutPopUp(false)}
          className='cursor-pointer bg-[#EEEEEE] h-10 w-20 rounded-sm shadow-2xl active:scale-95'>
          Cancel
        </button>
        <button onClick={logOut}  className='cursor-pointer bg-teal-400 h-10 w-20 ml-2 font-semibold rounded-sm shadow-2xl active:scale-95' >
          Logout
        </button>
        </div>

      </div>
    </div>
  )
}

export default LogoutPop;