import React from 'react'

export const TransactionTable = (prop) => {
    return (
        
                    <tr className="bg-danger p-2 text-dark bg-opacity-10">
                        <td>{prop.transactionDateShowUser}</td>
                        <td>{prop.amount}</td>
                        <td> <span>{prop.interest}</span> </td>
                        <td><span>{prop.transactionDetails}</span></td>
                    </tr>
        
    )
}
