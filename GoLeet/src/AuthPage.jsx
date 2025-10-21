import React from "react";
import { useState } from "react";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import spinner from "./assets/spinner.svg"


export default function AuthPage(props) {
  const [loginScreen, setLoginScreen] = useState(true);
  const [loading, setLoading] = useState(false)

  return (
    <div className="w-screen h-screen">
      {loginScreen ? <Login toggleAuth={setLoginScreen} toggleIsLogged = {props.toggleIsLogged} /> : <Signup  toggleAuth={setLoginScreen}/>}
    </div>
  );
}