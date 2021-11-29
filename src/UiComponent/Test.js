import React from 'react'

export const Test = () => {

    const Login=async()=>{
        const data={
          userId:document.getElementById("email").value,
          password:document.getElementById("password").value
      }
      
   
    }    
    return (
        <div>
            <input type="text" id="email" placeholder="emailId"/>
            <input type="text"id="password" placeholder="password"/>
            <input type="submit" onClick={Login}>Login</input>
        </div>
    )
}
