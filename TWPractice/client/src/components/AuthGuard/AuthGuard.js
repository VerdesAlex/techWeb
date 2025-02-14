import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AppContext from "../../state/AppContext"
import { SERVER } from '../../config/global'

const AuthGuard = ({ children, isAuthenticated }) => {
  const location = useLocation()
  const [isValid, setIsValid] = useState(()=>{
    const isValidState = localStorage.getItem("valid")
    return isValidState === "true";
  });

  useEffect(()=>{
    const validateToken = async () => {
        const user_data = JSON.parse(localStorage.getItem("user_data"))
        
        if(!user_data) {
            return false;
        }

        const token = user_data.token;
        
        const API_URL = SERVER + "/auth/validate";
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              token: token
            })
        });
        const data = await response.json();
        if(data.error) {
            localStorage.setItem("valid", false);
            setIsValid(false);
            return;
        }
        else {
            localStorage.setItem("valid", true);
            setIsValid(true);
            return;
        }

    }
    validateToken();
  }, [])

  if(isValid == null) {
    return (<div>
        Loading...
    </div>)
  }



  if(isAuthenticated || isValid) {
    return children;
  }

  if (!isAuthenticated || !isValid) {    
        return <Navigate to="/login" state={{ from: location }} replace />
  }
    
    // Redirect to login page and preserve the current location in state
}

export default AuthGuard