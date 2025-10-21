import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import isEmail from 'validator/lib/isEmail'
import toast from 'react-hot-toast'

function Login(props){
  const [passField, setPassField] = useState('')
  const [emailField, setEmailField] = useState('')
  const [showPass, setShowPass] = useState(false)


  async function LoginUser(e){
    e.preventDefault();
    const userMail = emailField;
    const userPass = passField;

    if(!isEmail(userMail)){
        toast.error('Email is not valid');
        return;
    }
    if(userPass.length < 6){
        toast.error('Password is too short');
        return;
    }
    try{
      const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/auth/login`, {
      method : "POST",
      credentials : "include",
      body : JSON.stringify({
        email : userMail,
        password : userPass,
      }),
      headers : {
        "Content-Type" : "application/json",
      }
    })
    const data = await resp.json();
    if(!resp.ok){
         toast.error(`Error Occured : ${data.message}`);
        return;
    }
    
    toast.success(`Logged in Succesfully`);
    props.toggleIsLogged(true)
    }
    
    catch(error){
      toast.error(`Error Occured : ${error.message}`);
    }

  } 
  return (
    <div className='w-screen h-screen  bg-[#15181D] flex justify-center items-center'>
        <div className=' border border-teal-400 bg-[#17191A] flex flex-col w-[90%] sm:w-[60%] lg:w-[40%] h-[60%] drop-shadow-sm rounded-2xl drop-shadow-teal-300'>
            <h1 className='text-[#EEEEEE] text-3xl font-bold text-center mt-12'>Welcome Back !!</h1>

            <div className=' flex flex-col justify-center items-center flex-grow w-full'>
                <form className='w-full h-[70%] flex flex-col items-center justify-around' onSubmit={LoginUser}>
                <div className='w-[90%] bg-[#1E2127] p-3 rounded-xl flex'>
                  <Mail className='text-[#EEEEEE] opacity-70 mr-2 w-6'/>
                  <input type="text" className='focus:outline-none focus:ring-none bg-[#1E2127] text-[#EEEEEE] flex-grow' onChange={(e) => setEmailField(e.target.value)} value={emailField} placeholder='Enter email ' />
                </div>
                  <div className='w-[90%]  bg-[#1E2127] p-3 rounded-xl mt-2 flex'>
                  <Lock className='text-[#EEEEEE] opacity-70 mr-2 w-6'/>
                  <input type={showPass ? `text` : `password`} className='flex-grow bg-none focus:outline-none bg-[#1E2127] focus:ring-none text-[#EEEEEE]' onChange={(e) => setPassField(e.target.value)} placeholder='Enter Password' value={passField}/>
                  {showPass ? <Eye className='text-[#EEEEEE]' onClick={() => setShowPass(prev => !prev)} /> : <EyeOff className='text-[#EEEEEE]' onClick={() => setShowPass(prev => !prev)} />}
                </div>
                <button 
                className="mt-9 w-[90%] rounded-lg p-2 font-semibold text-[#17191A] bg-teal-400"> Login </button>
            </form>
            </div>
            <p className='text-center text-[#EEEEEE] mb-8'>New User? <button onClick={() => props.toggleAuth(prev => !prev)} className='text-teal-400'>Signup</button></p>
        </div>
    </div>
  )
}

// bg-[#222831]

// Black : 	#15181D
//grey : #1E2127
// teal : #76ABAE
// cream : #EEEEEE


export default Login