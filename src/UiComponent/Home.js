import React from 'react'
import { Redirect } from 'react-router'

export const Home = () => {
    let customerId=sessionStorage.getItem("customerId")
    if(sessionStorage.getItem("customerId")!==null)
    {
    return (
        <Redirect to="/cusprofile"/>
    )
    }
    else
    {
        return(
            <Redirect to="/login"/>
        )
    }
}
