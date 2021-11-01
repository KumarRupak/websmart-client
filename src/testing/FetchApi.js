import React from 'react'
import { useEffect,useState } from 'react'

export const FetchApi = () => {

    const [user, setuser] = useState([])

    const getUsers=async ()=>{
        
           const response=await fetch("http://localhost:8085/cus")
           
           setuser(await response.json())
           
    }

    useEffect(() => {
        getUsers();
    },[])
    return (
        <div>
            {
                user.map((curElem)=>{
                    return (
                        <div>
                          <h1>{curElem.customerId}</h1>
                        </div>
                    )
                })
            }
           
        </div>
    )
}
