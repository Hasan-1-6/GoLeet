import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import lclogo from '../assets/lclogo.png'
import { Trash2, Variable, Plus, X } from 'lucide-react';
import {toast} from 'react-hot-toast'
import SheetAddQues from './SheetAddQues';
import { contextObject } from '../App';
import spinner from "../assets/spinner.svg"

function Sheet() {
  const { id } = useParams();
  const [userInput, setuserInput] = useState('');
  const [sheetData, setsheetData] = useState({});
  const [quesData, setquesData] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {setActiveSheet} = useContext(contextObject)

  //after fetch check the sheetId if it is valid then all good but if it is not then use link to navigate to an error page
  async function fetchQues(){
    
   try{
      // if(userInput == "") this is handled inside useeffect
      const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/sheet/queryLC?input=${userInput}`,
        {
          method : "GET",
          credentials : "include",
        }
      )
      const data = await resp.json();
      
      if(!resp.ok){
        toast.error('Leetcode queryLC coulndt be fetched :(')
        return;
      }

      setquesData(data.map(elem =>  {return {
        difficulty : elem.difficulty,
        question_id : elem.question_id,
        title : elem.title, 
        url : `https://leetcode.com/problems/${elem.slug}`
      }}));

      ///first of all data.allQues as array of 5 responses
      //map those first of all and then use slug to make it url
      //theres title, difficulty, url
    }
    catch(err){
      toast.error("couldnt fetch queryLC questions" + err.message)
    }
  }
  useEffect(()=>{
    if(!userInput){ 
      setquesData([])
      return
    };
    const handler = setTimeout(() => {
      fetchQues();
    }, 500);

    // return celanup to remove setTimeout;
    return () => { clearTimeout(handler)}
  }, [userInput])

  useEffect( () => {
    async function fetchData(){
      setLoading(true)
      setActiveSheet(id);
      try{
        const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/sheet/${id}`, {
          method : "GET",
          credentials : "include",
        })
        const userResp = await fetch(`${import.meta.env.VITE_APP_URL}/api/sidebar/getUserInfo`, {
          method : "GET",
          credentials : "include",
        })
        const data = await resp.json();
        const userData = await userResp.json();

        if(!resp.ok){
          toast.error("Couldnt fetch sheet data" + data.message);
          navigate("/error")
          return;
        }
        if(!userResp.ok){
          toast.error("Couldnt fetch user data" + data.message);
          navigate("/error")
          return;
        }
        setsheetData(data);
        setUserName(userData.name)
        }
      catch(err){
        toast.error("Some error occured while fetching data" + err.message);
        navigate("/error")
      }
      finally{
        setLoading(false)
      }
    }
    fetchData();
  }
  ,
    [id])
  return (
     <>
      {loading &&
        <div className="bg-black/50 backdrop-blur-[2px] z-500 absolute h-screen w-screen flex justify-center items-center">
          <img src={spinner} className='w-20'></img>  
        </div>}

        <div className='h-screen w-full overflow-y-scroll p-4 md:p-10'>
        
        <div className=''>
            <h1 className='text-[#EEEEEE] text-4xl md:text-5xl font-semibold'>{sheetData.title}</h1>
            
            
            <p className='text-[#EEEEEE] text-lg md:text-xl mt-4 md:mt-7'>{sheetData.description}</p>
            <div className='flex items-baseline mt-10'>
              <h4 className= 'font-semibold text-[#EEEEEE]'>Made by</h4>
            <span className='text-teal-300 text-md md:text-xl font-extrabold ml-2'>{userName}</span>
            <span className='font-extrabold text-[#EEEEEE] text-xl ml-auto'>{sheetData.numOfQues} Questions</span>
            </div>
        </div>

        <div className='w-full flex relative justify-center mt-5 md:mt-10'>
          {sheetData.owner && 
          <div className='relative w-full flex justify-between items-center  p-2 bg-[#262A31] rounded-md'>
              <input type="text" onChange={(e) => setuserInput(e.target.value)} value={userInput} className='w-[80%] bg-transparent focus:outline-none focus:ring-none h-10 pl-4  text-[#EEEEEE]' placeholder='Enter Question to Find on Leetcode'/>
             {userInput.length > 0 && <button onClick={() => setuserInput('') }className='text-[#EEEEEE] cursor-pointer hover:scale-105 transition hover:text-gray-500 mr-3'> <X/> </button>}
          </div>
          }
         
          {quesData.length > 0 && 
          <div className='absolute border border-teal-400 w-[90%] md:w-[75%] top-23 mt-4 bg-[#262A31] rounded-md'>
              {quesData.map((elem, key) => {
                return <SheetAddQues setuserInput={setuserInput} sheetData={sheetData} difficulty={elem.difficulty} title = {elem.title} url = {elem.url} question_id = {elem.question_id} key={key} setSheetData = {setsheetData

                }/>
              })}
          </div>}
        </div>
        
        <div className='bg-[#262A31] mt-10'>
          {( sheetData.ques && 
            sheetData.ques.map((elem, key) =>{
              return <QuesComp sheetData={sheetData} setSheetData={setsheetData} title={elem.title} link={elem.url} difficulty = {elem.difficulty} question_id = {elem.quesId} isOwner = {sheetData.owner} key={key}/>
            })
          )} 
        </div>
        </div>
      
     </>
  )
}

{/* <div className='h-screen w-full overflow-y-scroll p-4 md:p-10'>
        //used for showing all the text above 
        <div className=''>
            <h1 className='text-[#EEEEEE] text-4xl md:text-5xl font-semibold'>{sheetData.title}</h1>
            
            
            <p className='text-[#EEEEEE] text-lg md:text-xl mt-4 md:mt-7'>{sheetData.description}</p>
            <div className='flex items-baseline mt-10'>
              <h4 className= 'font-semibold text-[#EEEEEE]'>Made by</h4>
            <span className='text-teal-300 text-md md:text-xl font-extrabold ml-2'>{userName}</span>
            <span className='font-extrabold text-[#EEEEEE] text-xl ml-auto'>{sheetData.numOfQues} Questions</span>
            </div>
        </div>

        <div className='w-full flex relative justify-center mt-5 md:mt-10'>
          {sheetData.owner && 
          <div className='relative w-full flex justify-between items-center  p-2 bg-[#262A31] rounded-md'>
              <input type="text" onChange={(e) => setuserInput(e.target.value)} value={userInput} className='w-[80%]  bg-transparent focus:outline-none focus:ring-none h-10 pl-4  text-[#EEEEEE]' placeholder='Enter Question to Find on Leetcode'/>
             {userInput.length > 0 && <button onClick={() => setuserInput('') }className='text-[#EEEEEE] cursor-pointer hover:scale-105 transition hover:text-gray-500 mr-3'> <X/> </button>}
          </div>
          }
         
          {quesData.length > 0 && 
          <div className='absolute border border-teal-400 w-[90%] md:w-[75%] top-23 mt-4 bg-[#262A31] rounded-md'>
              {quesData.map((elem, key) => {
                return <SheetAddQues setuserInput={setuserInput} sheetData={sheetData} difficulty={elem.difficulty} title = {elem.title} url = {elem.url} question_id = {elem.question_id} key={key} setSheetData = {setsheetData

                }/>
              })}
          </div>}
        </div>
        
        <div className='bg-[#262A31] mt-10'>
          {( sheetData.ques && 
            sheetData.ques.map((elem, key) =>{
              return <QuesComp sheetData={sheetData} setSheetData={setsheetData} title={elem.title} link={elem.url} difficulty = {elem.difficulty} question_id = {elem.quesId} isOwner = {sheetData.owner} key={key}/>
            })
          )} 
        </div>
    </div> */}

function QuesComp(props){
  const sheetData = props.sheetData
  const leetcodeUrl = props.link;
  const diffcolor = (props.difficulty == 'easy' ? `text-green-400` : (props.difficulty == `medium` ? `text-orange-400` : `text-red-600`));
  async function removeFromSheetData(){  
    //check if sheetdata.ques has any matching ques by question id
    const RemovedSheetData = {
        ...sheetData,
        numOfQues : sheetData.numOfQues-1,
        [props.difficulty] : sheetData[props.difficulty]-1
        ,ques : sheetData.ques.filter((elem) => (elem.quesId !== props.question_id))
    }
        props.setSheetData(RemovedSheetData)
        try{
        const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/sheet/updateSheet`, {
                method : 'POST',
                credentials : "include",
                body : JSON.stringify({
                sheetData : RemovedSheetData
                }),
                headers :{
                "Content-Type" : "application/json"
                },
            })
            if(!resp.ok){
                toast.error("resp was not okayw hile setttings sheet")
            }
            toast.success("Removed question succesfully");

        }
        catch(err){
            toast.error("some error ocured while setting sheet to backend", + err.message)
        }
    }
  return(
    <div className='w-full flex h-20 items-center rounded-md px-3 md:px-8'>
        <div className='flex items-center py-4 w-full'>
          <h2 className={`${diffcolor} text-md`}>●</h2>
          <p className='ml-[8%] text-sm md:text-lg text-[#EEEEEE] font-semibold hover:text-teal-200 hover:drop-shadow-[0_0_4px_rgba(45,212,191,0.3)] transition-colors'>{props.title}</p>
        </div>
        <a className='ml-auto mr-[8%]' href={leetcodeUrl} ><img src={lclogo} alt="link"  className='w-10 hover:scale-110 cursor-pointer' /></a>
        {props.isOwner && <button className='w-10' onClick={removeFromSheetData}><Trash2 className='text-[#EEEEEE] transition-colors hover:text-red-500'/></button>}
        {/* onclick == delete the ques from the sheet if its user */}
    </div>
  )
}



export default Sheet