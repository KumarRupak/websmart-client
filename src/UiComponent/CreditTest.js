import { Button } from "@material-ui/core";
import {  useState } from "react";
import { Alert } from "./Alert";
import uri from './services/api.json';


export const CreditTest = () => {

  const [alert, setalert] = useState(null);
  const data={}

  const showAlert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 6000);
  };
  

  const PredictResult=async()=>{

    let count=0
  //CustomerId----
  if(sessionStorage.getItem("customerId")!==null){
  count++
  console.log(sessionStorage.getItem("customerId"))
  data.customerId=sessionStorage.getItem("customerId")
  }
  //cardType------
  if(localStorage.getItem("cardType")!==null){
    count++
    data.cardType=localStorage.getItem("cardType")
  }
  //Gender-------
  if(document.getElementById('male').checked){
    count++
    data.gender='male'
  }
  else if(document.getElementById('female').checked){
    count++
    data.gender='female'
  }
  else if(document.getElementById('others').checked){
    count++
    data.gender='others'
  }

  //Age------
  if(document.getElementById('25').checked){
    count++
    data.age=25
  }
  else if(document.getElementById('35').checked){
    count++
    data.age=35
  }
  else if(document.getElementById('45').checked){
    count++
    data.age=45
  }

  //Income-----
  if(document.getElementById('4').checked){
    count++
    data.income=4
  }
  else if(document.getElementById('7').checked){
    count++
    data.income=7
  }
  else if(document.getElementById('10').checked){
    count++
    data.income=10
  }


  //Cibil Score----
  if(document.getElementById('0').checked){
    count++
    data.cibilScore=0
  }
  else if(document.getElementById('400').checked){
    count++
    data.cibilScore=400
  }
  else if(document.getElementById('600').checked){
    count++
    data.cibilScore=600
  }
  else if(document.getElementById('700').checked){
    count++
    data.cibilScore=700
  }
  else if(document.getElementById('900').checked){
    count++
    data.cibilScore=900
  }


  //Marital Status-----
  if(document.getElementById("married").checked){
    count++
    data.maritalStatus="married"
  }
  else if(document.getElementById("unmarried").checked){
    count++
    data.maritalStatus="unmarried"
  }

//Profession--------
if(document.getElementById("government sector").checked){
  count++
  data.profession="government sector"
}
else if(document.getElementById("private sector").checked){
  count++
  data.profession="private sector"
}
else if(document.getElementById("Business").checked){
  count++
  data.profession="Business"
}
else if(document.getElementById("Student").checked){
  count++
  data.profession="Student"
}
else if(document.getElementById("Farmer").checked){
  count++
  data.profession="Farmer"
}

if(count===8){
  document.getElementById('loading').innerHTML=
  `<div class="spinner-border text-danger" role="status">
  <span class="sr-only">.</span>
  </div>`
   try
    {
   let response=await fetch(uri.uriCreditTest
    +"?token="+sessionStorage.getItem("token"),{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'   
    },
    body:JSON.stringify(data)
  })
      if(response.status===200)
      {
        let status=await response.json()
        if(status.status==="Eligible")
        {
          showAlert("Congratulation you have been eligible for the credit", "success");
          document.getElementById('loading').innerHTML='Predict'
        }
        else
        {
          showAlert("You are not eligible!! Thank you", "success");
          document.getElementById('loading').innerHTML='Predict'
        }
      }
      else{
        showAlert("Please try again", "warning");
        document.getElementById('loading').innerHTML='Predict'
      }
    }
    catch(error){
      showAlert("Please try again", "warning");
      document.getElementById('loading').innerHTML='Predict'
    }
}
else
{
  showAlert("Please fill all deatils", "warning");
  document.getElementById('loading').innerHTML='Predict'
}



  }

   return (
     <>
    <Alert alert={alert} />
    <div>
      <div className="card text-center overflow-auto">
        <div className="card-header">CREDIT PREDICTION</div>
        <div
          className="card-body"
          style={{ overflow: "scroll", height: "83vh" }}
        >
          <p className="card-text">
            <span className="d-flex flex-row badge badge-secondary text-info bg-secondary">
              Gender
            </span>
            <br />

            
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="others"
                value="others"
              />
              <label className="form-check-label" htmlFor="others">
                Others
              </label>
            </div>
          

            <br />
            <hr />
            <span className="d-flex flex-row  badge badge-secondary text-info bg-secondary">
              Age
            </span>
            <br />

           
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="age"
                id="25"
                value="25"
              />
              <label className="form-check-label" htmlFor="25">
                {"20>age<30"}
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="age"
                id="35"
                value="35"
              />
              <label className="form-check-label" htmlFor="35">
                {"30>age<40"}
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="age"
                id="45"
                value="45"
              />
              <label className="form-check-label" htmlFor="45">
                {"40>age<50"}
              </label>
            </div>


            <br />
            <hr />
            <span className="d-flex flex-row badge badge-secondary text-info bg-secondary">
              Income
            </span>
            <br />

            
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="income"
                id="4"
                value="4"
              />
              <label className="form-check-label" htmlFor="4">
                {"3.LPA>to<5.LPA"}
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="income"
                id="7"
                value="7"
              />
              <label className="form-check-label" htmlFor="7">
                {"5.LPA>to<10.LPA"}
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="income"
                id="10"
                value="10"
              />
              <label className="form-check-label" htmlFor="10">
                {">10.LPA"}
              </label>
            </div>


            <br />
            <hr />
            <span className="d-flex flex-row badge badge-secondary text-info bg-secondary">
              Cibil score
            </span>
            <br />

            
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="cibilScore"
                id="0"
                value="0"
              />
              <label className="form-check-label" htmlFor="0">
                {"<300"}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="cibilScore"
                id="400"
                value="400"
              />
              <label className="form-check-label" htmlFor="400">
                {"300-550"}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="cibilScore"
                id="600"
                value="600"
              />
              <label className="form-check-label" htmlFor="600">
                {"550-700"}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="cibilScore"
                id="700"
                value="700"
              />
              <label className="form-check-label" htmlFor="700">
                {"700-750"}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="cibilScore"
                id="900"
                value="900"
              />
              <label className="form-check-label" htmlFor="900">
                {"750-900"}
              </label>
            </div>


            <br />
            <hr />

            <span className="d-flex flex-row badge badge-secondary text-info bg-secondary">
              Marital status
            </span>
            <br />

            
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="maritalStatus"
                id="married"
                value="married"
              />
              <label className="form-check-label" htmlFor="married">
                Married
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="maritalStatus"
                id="unmarried"
                value="unmarried"
              />
              <label className="form-check-label" htmlFor="unmarried">
                Unmarried
              </label>
            </div>
            


            <br />
            <hr />
            <span className="d-flex flex-row badge badge-secondary text-info bg-secondary">
              Profession
            </span>
            <br />

            
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="profession"
                id="government sector"
                value="government sector"
              />
              <label className="form-check-label" htmlFor="government sector">
                Government sector
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="profession"
                id="private sector"
                value="private sector"
              />
              <label className="form-check-label" htmlFor="private sector">
                Private sector
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="profession"
                id="Business"
                value="Business"
              />
              <label className="form-check-label" htmlFor="Business">
                Business
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="profession"
                id="Student"
                value="Student"
              />
              <label className="form-check-label" htmlFor="Student">
                Student
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="profession"
                id="Farmer"
                value="Farmer"
              />
              <label className="form-check-label" htmlFor="Farmer">
                Farmer
              </label>
            </div>
            

            <br />
            <hr />
          </p>
          <Button
            variant="outlined"
            color="error"
            onClick={PredictResult}
            className="btn btn-primary"
          >
             <h6 id="loading">  Predict </h6>
          </Button>
        </div>
        <div className="card-footer text-muted">
          Provided details will be varified
        </div>
      </div>
    </div>
    </>
  );
};
