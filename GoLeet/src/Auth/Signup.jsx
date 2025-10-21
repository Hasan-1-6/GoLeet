import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import isEmail from 'validator/lib/isEmail';
import toast, { Toaster } from 'react-hot-toast';


function Signup(props){
    const [showPass, setShowPass] = useState(false);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        if(!isEmail(mail)){
            toast.error('Email is not valid');
            return;
        }
        if(password.length < 6){
            toast.error('Password is too short');
            return;
        }
        if(name.length == 0){
            toast.error('Name field is empty');
            return;
        }
        try{
            const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/auth/register`,
            {
                method : "POST",
                credentials : "include",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    name : name,
                    email : mail,
                    password : password 
                })
            })
            const data = await resp.json()
            if(!resp.ok) {
                toast.error(`Error Occured : ${data.message}`);
                return;
            }
            toast.success(`Registered Succesfully`);
            props.toggleAuth(prev => !prev)
        }
        catch(error){
            toast.error(`Error Occured : ${error.message}`);
            return;
        }
    }
  return (
    
        <div className='w-screen h-screen border bg-[#15181D] flex justify-center items-center'>
            <div className=' border border-teal-400 bg-[#17191A] flex flex-col w-[90%] sm:w-[60%] lg:w-[40%] h-[70%] drop-shadow-sm rounded-2xl drop-shadow-teal-300'>
                <h1 className='mt-14 text-[#EEEEEE]  m-8 text-center text-3xl font-bold'>Join Go<span className='text-teal-400 font-extrabold'>Leet </span> Now !! </h1>
                <form action="" onSubmit={handleSubmit} className=' h-[60%] w-full flex flex-col items-center justify-around'>
                    <div className='w-[90%] bg-[#1E2127] p-3 rounded-xl flex'>
                        <User className='text-[#EEEEEE] opacity-70 mr-2 w-6'/>
                        <input type="text" className='focus:outline-none focus:ring-none text-[#EEEEEE] flex-grow' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name ' />
                    </div>
                    <div className='w-[90%] bg-[#1E2127] p-3 rounded-xl flex'>
                        <Mail className='text-[#EEEEEE] opacity-70 mr-3 w-6'/>
                        <input type="text" className='focus:outline-none focus:ring-none text-[#EEEEEE] flex-grow' value={mail} onChange={(e) => setMail(e.target.value)} placeholder='Email ' />
                    </div>
                    <div className='w-[90%]'>
                        <div className='w-full bg-[#1E2127] p-3 rounded-xl flex'>
                            <Lock className='text-[#EEEEEE] opacity-70 mr-3 w-6'/>
                            <input type={showPass ? `text` : `password`} onChange={(e) => setPassword(e.target.value)} className='focus:outline-none focus:ring-none text-[#EEEEEE] flex-grow' value={password} placeholder='Password ' />
                            {showPass ? <Eye className='text-[#EEEEEE]' onClick={() => setShowPass(prev => !prev)} /> : <EyeOff className='text-[#EEEEEE]' onClick={() => setShowPass(prev => !prev)} />}
                        </div>
                        <p className={`absolute ${password.length == 0 || password.length > 6 ? `hidden` : `text-red-400` }  text-sm self-start ml-2`}>Password must be 6 characters long</p>
                    </div>
                    
                    <button type='submit' className=" w-[90%] mt-6 rounded-lg p-2 font-semibold text-[#17191A] bg-teal-400"> Register </button>
                </form>
                <p className='text-center text-[#EEEEEE] my-auto'>Existing User? <button onClick={() => props.toggleAuth(prev => !prev)} className='text-teal-400'>Login</button></p>
            </div>
        </div>
  )
}

// bg-[#222831]

// Black : 	#15181D
//grey : #1E2127
// teal : #76ABAE
// cream : #EEEEEE


export default Signup