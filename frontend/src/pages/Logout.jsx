import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [token] = useState(localStorage.getItem("token"))
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.setItem("token", "")
  }
  useEffect(() => {
    if(token === "" || !token){
    return navigate("/authentication")
  }
  }, [])
  
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <button className='px-4 py-2 bg-yellow-500 text-white cursor-pointer' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout