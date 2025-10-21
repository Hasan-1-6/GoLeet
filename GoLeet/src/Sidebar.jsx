import React, { useContext, useEffect, useState } from 'react'
import logo from '../src/assets/logo.png'
import { ChevronRight, ChevronLeft, FileSpreadsheet, Pencil, Trash, LogOut } from 'lucide-react';
import toast from 'react-hot-toast'
import Newsheetform from './popupModels/Newsheetform';
import LogoutPop from './popupModels/LogoutPop';
import { useNavigate, useParams } from 'react-router';
import { contextObject } from './App';
import DeleteSheetPop from './popupModels/DeleteSheetPop';


function Sidebar(props) {
  const[userSheets, setUserSheets] = useState([{
    title : "HELlo"
  }]);
  const [expanded, setExpanded] = useState(false);
  const [userInfo,  setUserInfo] = useState({name : "John Deo", email : "johndoe@gmail.com"})
  const [PopUp, setPopUp] = useState(false);
  const [logoutPopUp, setLogoutPopUp] = useState(false);
  const [deleteSheetPopUp, setdeleteSheetPopUp] = useState(false);
  const [sheetToDelete, setSheetToDelete] = useState({});

  
  const { activeSheet } = useContext(contextObject);
  const navigate = useNavigate();

  useEffect(() => {
      async function getUserName(){
      try{
          const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/sidebar/getUserInfo`,{
            method : "GET",
            credentials : "include"
          })
          if(!resp.ok){
            toast.error('Couldnt fetch name' + resp.status);
            return;
          }
          const data = await resp.json()
          setUserInfo({name : data.name, email : data.email})
        }
        catch(error){
          toast.error(`Some error occured ${error.message}`)
        }
    }
    getUserName()
    getUserSheets()
    }
    , [])
  
  async function getUserSheets(){
    try{
      const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/sidebar/getSheets`,{
        method : "GET",
        credentials : "include"
      })
      
      const data = await resp.json()
      if(!resp.ok){
        toast.error('Couldnt fetch sheet' + data.message);
        return;
      }
      setUserSheets(data)
    }
    catch(error){
      toast.error(`Some error occured ${error.message}`)
    }
  }

  
  return (
    <div className={`h-screen bg-[#15181D] transition-all duration-500 flex flex-col absolute lg:relative z-[999] ${!expanded && '-translate-x-[100%] lg:translate-x-0'}`}>
      {PopUp && <Newsheetform setPopUp = {setPopUp} setUserSheets= {setUserSheets}/>}
      {logoutPopUp && <LogoutPop setIsLogged={props.setIsLogged} setUserInfo={setUserInfo} setLogoutPopUp={setLogoutPopUp}/>}
      {deleteSheetPopUp && <DeleteSheetPop sheetId={sheetToDelete.sheetId} setdeleteSheetPopUp={setdeleteSheetPopUp} sheetName={sheetToDelete.sheetName} setUserSheets={setUserSheets}/>}

      <div className='w-full flex pt-10 pb-10 px-4 justify-start items-center  border-[#1E2127] border-b'>
        
        <img onClick={() => navigate('/')}src={logo} className={`text-white transition-all cursor-pointer  ${expanded ? `w-60 pr-12` : `w-0`}`} id="logo-12" ></img>
        <button onClick={() => setExpanded((curr => !curr))} className={`bg-teal-400 lg:bg-[#EEEEEE] rounded-full shadow-2xl z-999 ${!expanded && `absolute bg-teal-400 translate-x-[120%] lg:translate-x-0`}`}>
          {expanded ? <ChevronLeft className='text-[#15181D] h-8 w-8 ' />: <ChevronRight className='text-[#15181D] h-8 w-8' /> }
        </button>
      </div>

      {/* THIS IS FOR THE SHEETS AND STUFF */}
      <div className='h-full flex flex-col'>
          <div className='flex items-center m-4'>
            <FileSpreadsheet className={`text-white ${expanded ? `inline-block` : `hidden sm:inline-block`} h-8 w-8`}/>
            <span className={`text-[#EEEEEE] text-xl font-semibold ml-2  ${!expanded && 'hidden'}`}> My Sheets</span>
          </div>
          <div className= {`bg-[#15181D] w-full h-full rounded-md overflow-y-scroll flex-1 ${!expanded && `hidden`} `}>
            
            {userSheets.map((elem, i) => {
              const isActive = activeSheet == elem.id;
                return <SheetItems title = {elem.title} id = {elem.id} active = {isActive} setSheetToDelete={setSheetToDelete} setdeleteSheetPopUp={setdeleteSheetPopUp} key = {i}  />
            })}
          </div>
          <button className={`mx-auto mt-auto bg-teal-400 text-[##15181D] p-2 rounded-xl flex justify-center w-[70%] cursor-pointer hover:bg-[#EEEEEE] transition-colors active:scale-95`}
          onClick={() => setPopUp(prev => !prev)}
          ><Pencil className=''/> <span className={`ml-2 mr-4 font-semibold transition-all ${!expanded && 'hidden'}`}>New Sheet</span></button> 
      </div>
      
      {/*  this is the account section*/}
      <div className='mt-auto p-3 flex  border-[#1E2127]' >
        <img src={`https://ui-avatars.com/api/?name=${userInfo.name}&background=EEEEEE&color=1E2127&bold=true`} alt="icon" className='rounded-xl h-10 w-10'/>
        {expanded && 
        <div className='ml-3 w-full flex justify-between items-center'>
          <div className='leading-5.5'>
             <h1 className='font-semibold text-[#EEEEEE] overflow-hidden'>{userInfo.name}</h1>
            <p className='text-xs text-[#EEEEEE] overflow-hidden opacity-80'>{userInfo.email}</p>
          </div>
          <LogOut onClick={()=> setLogoutPopUp(prev => !prev)} className="text-[#EEEEEE]  hover:text-red-600 transition-colors"/>
        </div>
        }
      </div>
    </div>
  )
}

function SheetItems(props){
  const navigate = useNavigate();
  
  function navigateToSheet(){
    navigate(`/sheet/${props.id}`)
  }

  function showPopUp(){
  
    props.setSheetToDelete({
      sheetId : props.id,
      sheetName : props.title
    })
    props.setdeleteSheetPopUp(true);
  }
  return (
      <div onClick={navigateToSheet} className= {`flex py-3 px-4 justify-between items-center transition-colors cursor-pointer group hover:bg-[#1E2127] ${props.active && `bg-[#1E2127]`}`}>
        <span className='text-[#EEEEEE] font-semibold'>{props.title}</span>
        <button className='group p-2 cursor-pointer'  onClick={(e) => {e.stopPropagation(); showPopUp()}}>
          <Trash className='w-[80%] text-red-500 visible lg:invisible pointer-cursor transition-all group-hover:visible '/>
        </button>
      </div>
  )
}

// bg-[#222831]

// Black : 	#15181D
//grey : #1E2127
// teal : #76ABAE
// cream : #EEEEEE

export default Sidebar