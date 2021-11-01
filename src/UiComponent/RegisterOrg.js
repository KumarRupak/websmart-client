import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { Alert } from "./Alert";
import uri from "./services/api.json";
import swal from "sweetalert";

export const RegisterOrg = () => {
  const [data, setdata] = useState({
    organisationName: "",
    organisationEmail: "",
  });
  const [alert, setalert] = useState(null);

  const showAlert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 6000);
  };

  const register = (e) => {
    e.preventDefault();
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        data.organisationEmail
      ) === true
    ) {
      document.getElementById("email").style.borderColor = "green";
      document.getElementById(
        "loading"
      ).innerHTML = `<div class="spinner-border text-danger" role="status">
      <span class="sr-only">.</span>
      </div>`;
      axios
        .post(uri.uriRegisterOrg, data)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.status === "success") {
              swal(response.data.token).then(
                (value) => {
                  showAlert(
                    " Your service will be activated with in 24Hrs ",
                    "success"
                  );
                }
              );
            } else showAlert(" Email has been already registered ", "warning");

            document.getElementById("loading").innerHTML = "Get Key";
          }
        })
        .catch((error) => {
          showAlert(" Please try again ", "warning");
          document.getElementById("loading").innerHTML = "Get Key";
        });
    } else {
      document.getElementById("email").style.borderColor = "red";
      document.getElementById("loading").innerHTML = "Get Key";
    }
  };
  return (
    <>
      <Alert alert={alert} />
      <div>
        <h3 className="text-center text-white pt-5">Register form</h3>
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <body>
                  <form
                    onSubmit={register}
                    id="login-form"
                    className="form"
                    method="post"
                  >
                    <h3 className="text-center text-info">Register</h3>
                    <div className="form-group">
                      <label Htmlfor="name" className="text-info">
                        Organization Name
                      </label>
                      <br />
                      <input
                        onChange={(e) =>
                          setdata({ ...data, organisationName: e.target.value })
                        }
                        value={data.organisationName}
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label Htmlfor="email" className="text-info">
                        Organization Email
                      </label>
                      <br />
                      <input
                        onChange={(e1) =>
                          setdata({
                            ...data,
                            organisationEmail: e1.target.value,
                          })
                        }
                        value={data.organisationEmail}
                        type="mail"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <Button type="submit" variant="contained" name="submit">
                        <h7 id="loading"> Get Key </h7>
                      </Button>
                    </div>
                  </form>
                </body>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
