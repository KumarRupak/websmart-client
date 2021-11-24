import React from "react";
import { MdAccountCircle, MdHome } from "react-icons/md";
import { Link ,useHistory,Redirect} from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";
import uri from './services/api.json';


export const NavAdmin = () => {
  let history=useHistory()
  const logout=(e)=>{
    e.preventDefault();

    axios.post(uri.uriLogout
      +sessionStorage.getItem("adminId")
      +"?token="+sessionStorage.getItem("token")).then((response)=>{
        if(response.status===200){

          swal({
            title: "Are you sure?",
            text: "Do you want to logout",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("You have been successfully logged out", {
                icon: "success",
              }).then((session)=>{
                if(session){
                  sessionStorage.clear()
                  history.replace("/")
                }
              });
            }
          });

        }
        else{

          alert("Someting went wrong")

        }
      })  
  }
  const updateCredentails=()=>{
    axios.patch(uri.uriAdminUpdateCredentials+"?token="+sessionStorage.getItem("token"))
    .then((response)=>{
      if(response.data===true)
      swal("Successfully done!")
      else
      swal("Please try again!")
    })
    .catch((e)=>{
      swal("Please try again!")
    })
  }
  return (
    sessionStorage.getItem("adminId")!==null ?(
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark " style={{"background-color": "rgb(112, 41, 99)"}} >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
           Welcome : {sessionStorage.getItem("adminName")}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/adminhome"
                >
                  <MdHome/>
                </Link>
              </li>
             
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Current access list
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                  <Link className="dropdown-item" to={{pathname : `${uri.uriAdminAccessList}?token=${sessionStorage.getItem("token")}`}} target="_blank" role="button">
                    download csv
                  </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={updateCredentails}>
                      Update credentials
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex ">
              <button className="btn btn-outline-danger" onClick={logout} type="submit">
                logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
    ):<Redirect to="/login"/>
  );
};
