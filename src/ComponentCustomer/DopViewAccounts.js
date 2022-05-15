import React, { useEffect, useState } from 'react'
import Tr from './Tr'
import axios from 'axios'
import swal from 'sweetalert';
import api from './service/DopService.json'

function DopViewAccounts() {

  const [Data, setData] = useState([])
  

const searchAccountNo=(e)=>{
  var accountNum=document.getElementById("searchBox").value;
axios.get(api.apisearchAccountNo+accountNum)
.then((res)=>{
  if(res.status==200){
    setData(res.data)
  }

}).catch((res)=>{
  console.log("alert");
  swal("Alert!", "No Record Found!", "error");
})
}


const getAccounts=(pageCount)=>{
axios.get(api.apigetAccounts+pageCount)
.then((res)=>{
  if(res.status==200){
    setData(res.data)
  }
})

}



const getPages=()=>{
  axios.get(api.apigetPages)
  .then((res)=>{
    if(res.status==200){
      sessionStorage.setItem("pages",res.data)
    }
  })
  }

  




const updateDataPrevious=()=>{
var currentPage=parseInt(sessionStorage.getItem("page"))
if (currentPage>1){
  document.getElementById("previous").innerHTML="<div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div>"

 getAccounts(parseInt(sessionStorage.getItem("page"))-1)
 sessionStorage.setItem("page",parseInt(sessionStorage.getItem("page"))-1)
 document.getElementById("previous").innerHTML="Previous"
}

}



const updateDataNext=()=>{
 
  var Pages =parseInt(sessionStorage.getItem("pages"))
if(Pages>parseInt(sessionStorage.getItem("page"))){
  document.getElementById("next").innerHTML="<div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div>"
getAccounts(parseInt(sessionStorage.getItem("page"))+1)
sessionStorage.setItem("page",parseInt(sessionStorage.getItem("page"))+1)
document.getElementById("next").innerHTML="Next"
}
  console.log(parseInt(sessionStorage.getItem("page")))
 

}

useEffect(()=>{
  sessionStorage.setItem("page","1")
  getPages()
  getAccounts(parseInt(sessionStorage.getItem("page")))
},[])


    return (
        <div>
<nav class="navbar navbar-dark bg-dark">
  <a class="text-center navbar-brand text-white-50">Account Details</a>
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" id='searchBox' placeholder="Search Account No." aria-label="Search"/>
    <button class="btn btn-outline-light my-2 my-sm-0" type="submit" onClick={searchAccountNo}>Search</button>
  </form>
</nav>




  <div class="card-body"  style={{"overflow":"scroll"}}>
   
  <table className="table table-striped  container-fluid  my-5 " style={{"width":"60%","height":"100%"}}>
  <thead class="thead-dark">
    <tr>
      <th scope="col">Select</th>
      <th scope="col">Account Number</th>
      <th scope="col">Installment</th>
      <th scope="col">Account Holder</th>
      <th scope="col">Amount</th>
      <th scope="col">ASAALS</th>
    </tr>
  </thead>
  <tbody>

    {
      Data.map((map)=>{
        return[
<Tr 
accountNumber={map.accountNumber} 
installment={map.installment}
accountHolderName={map.accountHolderName}
amount={map.amount}
aslaasUpdate={map.aslaasUpdate}
>

</Tr>
        ]
      })
    }
   </tbody>
  


  <div style={{"marginRight":"10%"}} >
   <ul class="pagination justify-content-end ">

    <li class="page-item">
      <a class="page-link" href="#" id='previous' onClick={updateDataPrevious} >Previous</a>
    </li>
   
    <li class="page-item">
      <a class="page-link" href="#" id='next' onClick={updateDataNext} >Next</a>
    </li>
    
    
          
    </ul> 
  </div>
  </table>
<div>
    <li className="btn btn-primary float-right">
            <div id="loading">Submit</div>
    </li>
</div>
</div>
  

 </div>
    )
}

export default DopViewAccounts
