import React, { useContext } from 'react'
import Sidebar from './Sidebar'
import Sheet from './pages/Sheet'
import Home from './pages/Home'
import AuthPage from './AuthPage'
import ErrorPage from './pages/ErrorPage'
import { useEffect, useState, createContext } from 'react'
import spinner from "./assets/spinner.svg"
import { Toaster, toast, useToaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'


export const contextObject = createContext();

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [activeSheet, setActiveSheet] = useState('');
  const [loading, setLoading] = useState(true);
  

  

  async function verifyUser(){
    
    try{
      setLoading(true);
      const resp = await fetch(`${import.meta.env.VITE_APP_URL}/api/auth/verify`,{
      method : "GET",
      credentials : "include", 
    })
    if(resp.ok){
      setIsLogged(true)
    }
    }catch(err){
      console.log("Token expired")
      setIsLogged(false)
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    verifyUser();
  }, [])

  

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <contextObject.Provider value = {{activeSheet, setActiveSheet}}>
        <div className='flex relative'>
          <Sidebar setIsLogged = {setIsLogged}/>
          <Outlet />
        </div>
        </contextObject.Provider>
      ),
      children : [
        { index : true, element : <Home />}, //default child for '/' route we set above
        { path : 'sheet/:id', element : <Sheet />},
        { path : 'error', element : <ErrorPage />}
      ]
    }
  ]);

  // use useNavigate in sidebar.jsx to navigate routes without a worry
  // sheet compo me get params from useParams and render data accordingly

  
  return (
    
    <>
      <Toaster   toastOptions={{
          style: {
            borderRadius: '15px',
            background: '#333',
            color: '#fff',
          },
      }} />
      {isLogged ? (
        <>
          {/* {loading && <div className="bg-black/30 absolute h-screen w-screen flex justify-center items-center">
            <img src={spinner}></img>  
          </div>} */}
          <RouterProvider router={router} />
        </>
        ) : (
          <>
          {loading && <div className="bg-black/90 z-999 backdrop-blur-[2px] absolute h-screen w-screen flex justify-center items-center">
            <img src={spinner} className='w-20'></img>  
          </div>}
          <AuthPage toggleIsLogged={setIsLogged} />
          </>
        )}
    </>
  )
}

export default App

    