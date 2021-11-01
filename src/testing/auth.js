import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'




export const auth = () => {


    const user=()=>{
        
      fetch("http://localhost:8085/user",{
        method:'GET',
        credentials:'include'
    }

    ).then(response=>{
        return response.json();
    }).then(data=>{
        console.log(data);
    }).catch(error=>{
        console.log(error)
    })}

    const login=()=>{
    
      fetch("http://localhost:8085/login",{
        method:'POST',
        credentials:'include'
    }

    ).then(response=>{
        return response.text();
    }).then(data=>{
        console.log(data);
    }).catch(error=>{
        console.log(error)
    })



    }
    return (

        <div>
           <button onClick={login}>login</button> 
           <button onClick={user}>user</button> 
        </div>
    )
}



