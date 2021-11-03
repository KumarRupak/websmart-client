import React from "react";
import { MdAccountCircle, MdHome } from "react-icons/md";
import { Link ,useHistory,Redirect} from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";
import uri from './services/api.json';

export const Navbar = () => {
   let history=useHistory()
  const logout=(e)=>{
    e.preventDefault();

    
        if(true){

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
      
 
  }
  return (
    sessionStorage.getItem("customerId")!==null ?(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark " style={{"background-color": "rgb(112, 41, 99)"}} >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
           Welcome : {sessionStorage.getItem("customerId")}
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
                  to="/cusprofile"
                >
                  <MdHome/>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/cusprof"
                >
                  <MdAccountCircle/>
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
                  Others
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Show Bar
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
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
