import { ChevronLeft, ChevronRight, X  } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'



function Home() {
    const [listOfSheets, setListOfSheets] = useState();
    
    const [page, setPage] = useState(1);
    const [pageInp, setPageInp] = useState(1)
    const [hasMore, setHasMore] = useState(true);
    const [pressed, setPressed] = useState(false)
    //0 is for by title and 1 is for by newest
    
    const [querySheetInp, setQuerySheetInp] = useState('');
    const fetchQuerySheets = async () => {    
            try{
                const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/homepage/fetchQuerySheets`, {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    credentials : "include",
                    body : JSON.stringify({
                        input : querySheetInp,
                        page : page
                    })
                })
                if(!resp.ok){
                    toast.error("resp wasnt okay for some reasons")
                    return;
                }
                const data = await resp.json();
                console.log(data)
                setHasMore(data.hasMore);
                
                setListOfSheets(data.sheets);
            }
            catch(err){
                toast.error("Coudlnt find sheets" + err.message)
            }
        }
    const fetchSheets = async () => {
            if(querySheetInp != ''){
                console.log('inner shit something')
                fetchQuerySheets()
                return;
            }
            try{
                
                const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/homepage/fetchSheets`, {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    credentials : "include",
                    body : JSON.stringify({
                        page : page,
                        sortBy : pressed
                    })
                })
                if(!resp.ok){
                    toast.error("resp wasnt okay for some reasons")
                    return;
                }
                const data = await resp.json();
                console.log(data)
                setHasMore(data.hasMore);
                setListOfSheets(data.sheets);

            }
            catch(err){
                toast.error("Coudlnt find sheets" + err.message)
            }
        }
    
    useEffect(() =>{
        fetchSheets();
    }, [page, pressed]);

    useEffect(() => {
        
        let inpNum = parseInt(pageInp);
        if(isNaN(inpNum) || inpNum < 1 || inpNum > 200) return;
        setPage(inpNum);
    }, [pageInp])


    
    useEffect(()=>{

        
        if(querySheetInp == ''){
            fetchSheets();
            return;
        }
        const handler = setTimeout(() =>{
            setPage(1);
            
            fetchQuerySheets()
        }, 500)
        
        return () => clearTimeout(handler)
    }, [querySheetInp])
    

  return (
    <div className='w-full h-screen overflow-scroll p-5 md:p-10'>
        <h1 className='text-[#EEEEEE] text-3xl md:text-4xl font-bold '>Welcome to Go<span className='text-teal-400'>Leet </span>!!!</h1>
        <p className='text-[#EEEEEE] text-md md:text-lg mt-10 font-semibold '>GoLeet is your one-stop hub for coding practice and collaboration. Create personalized sheets by pulling problems directly from LeetCode and share your sheets with friends, teammates, or the entire community<br /><br />

    Explore hundreds of sheets crafted by coders across the world. Whether you’re preparing for interviews, sharpening your skills, or discovering new problem sets, GoLeet makes it simple, collaborative, and fun.<br/>
    <br/>
        </p>
        

        <div className='w-full flex justify-baseline items-center mt-5 md:mt-10 p-2 bg-[#262A31] rounded-md'>
            <input type="text" value={querySheetInp} onChange={(e) =>{setQuerySheetInp(e.target.value)}} className='w-[80%] bg-transparent focus:outline-none focus:ring-none h-10 pl-4 text-[#EEEEEE]' placeholder='Find 100s of different sheet... '/>
            {querySheetInp.length > 0 && <button onClick={() => setQuerySheetInp('') }className='ml-auto text-[#EEEEEE] cursor-pointer hover:scale-105 transition hover:text-gray-500 mr-3'> <X/> </button>}
        </div>

        <div className='flex w-full mt-4  rounded-md h-10 items-end mb-4 lg:px-19'>
            <div className='mr-auto flex items-center '>
                
                <div className='rounded-xl bg-[#15181D] '>
                    <button className={`text-[#EEEEEE] rounded-xl ${!pressed && `font-semibold bg-teal-500 text-black`}  p-2 pr-2 `} onClick={() => {setPressed(false)}}>A - Z</button>
                    
                    <button className={`text-[#EEEEEE] rounded-xl ${pressed && `font-semibold bg-teal-500 text-black`}  p-2 pl-2`} onClick={() => {setPressed(true)}}> Newest </button>
                </div>
            </div>
            <div className=' flex text-[#EEEEEE] gap-2'>
                
                <button className={`border-2 rounded-full h-10 w-10 active:scale-90 text-cyan-400 ${page == 1 && `hidden`}`}   onClick={() => {if(pageInp > 1)setPageInp(p => p-1)}}><ChevronLeft className='mx-auto scale-130'/></button>
                <input className='w-10 text-cyan-400  font-bold text-center text-xl outline-none' type="text" placeholder='...'  value={pageInp} onChange={(e)=> setPageInp(e.target.value)}/>
                <button className={`border-2 rounded-full h-10 w-10 text-cyan-400 active:scale-90 ${!hasMore && `hidden`} `} onClick={() => setPageInp(p => p+1)}><ChevronRight className='mx-auto scale-130'/></button>
            </div>
        </div>

        {/* <h2 className='mt-10 text-2xl text-[#EEEEEE]'>Popular Sheets</h2> */}
        {listOfSheets && <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-6 lg:gap-x-14 py-4 sm:py-10 px-4  lg:px-16 bg-[#262A31] rounded-md '>
            {listOfSheets.length > 0 ? listOfSheets.map((obj, id) => {
                return <Card sheetId ={obj.sheetId} title = {obj.title} author = {obj.author} description = {obj.description} numOfQues = {obj.numOfQues} easy={obj.easy} medium={obj.medium} hard={obj.hard} key = {id}/>
            }) : <h1 className='col-span-full mx-auto text-[#EEEEEE] font-semibold text-lg '>Could Not Find any sheet...</h1> }
        </div>}
    </div>
  )
}

function Card(props){
    const navigate = useNavigate();

    return (
        <div className='min-w-50 min-h-50 bg-[#15181D] border-teal-400 border-[1px] hover:drop-shadow-xl  hover:drop-shadow-teal-400/10 rounded-md hover:scale-105 transition-all flex flex-col justify-between py-3 active:scale-100 pointer-cursor select-none cursor-pointer' onClick={() => {
            navigate(`/sheet/${props.sheetId}`)
        }} >
            <div>
                <div className="flex items-baseline">
                    <span className='text-[#EEEEEE] font-bold text-xl px-4 '>{props.title}</span>
                <div className="w-34 truncate"><span className='text-teal-400 font-semibold text-sm'>{props.author}</span></div>
                </div>
             <p className='line-clamp-4 mt-2 text-gray-400 text-sm px-4'>{props.description}</p>
            </div>
            <div className='flex w-full justify-between px-10'>
                <div className='flex items-baseline w-12 rounded-xl justify-center bg-[#1E2127]'>
                    <h2 className={` text-green-400`}>•</h2>
                    <span className={`text-green-400 font-semibold`}>{props.easy}</span>
                </div>
                <div className='flex items-baseline w-12 rounded-xl justify-center bg-[#1E2127]'>
                    <h2 className={` text-orange-400`}>•</h2>
                    <span className={`text-orange-400 font-semibold`}>{props.medium}</span>
                </div>
                <div className='flex items-baseline w-12 rounded-xl justify-center bg-[#1E2127]'>
                    <h2 className={` text-red-500`}>•</h2>
                    <span className={`text-red-500 font-semibold`}>{props.hard}</span>
                </div>
            </div>
        </div>
    )
}


// bg-[#222831]

// Black : 	#15181D
//grey : #1E2127
// teal : #76ABAE
// cream : #EEEEEE
export default Home