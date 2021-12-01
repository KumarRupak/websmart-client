
import React from 'react'
import uri from './services/api.json';
import { Link } from 'react-router-dom';


export const TableBook = (prop) => {

    return (
        <>
        
                <tr className="bg-danger text-black bg-opacity-8  bg-opacity-10">
                    <td>{prop.subcribeId}</td>
                    <td>{prop.bookName}</td>
                    <td>{prop.issuedOn}</td>
                    <td>{prop.expiryOn}</td>
                    <td>{prop.subscriptionLeft=="0"?"Today":prop.subscriptionLeft}</td>
                    <td>   
                    <Link className="btn   btn-outline-success shadow-sm" to={{pathname : `${uri.uriBookDownload+prop.subcribeId}/?token=${sessionStorage.getItem("token")}`}} target="_top" role="button">download</Link>                   
                    </td>
                </tr>
                </>
    )
}
