import React from 'react'

function Tr(prop) {
  return (
    <>
    <tr>
     <td scope="row"><input id={prop.accountNumber} type="checkbox"></input></td> 
      <td scope="row">{prop.accountNumber}</td> 
      <td scope="row">{prop.installment}</td> 
      <td scope="row">{prop.accountHolderName}</td> 
      <td scope="row">{prop.amount}</td> 
      <td scope="row">{prop.aslaasUpdate}</td> 
    </tr>
    
    </>
  )
}

export default Tr