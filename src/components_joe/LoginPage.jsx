import React, { Component } from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import * as UTILS from "../utils";
import { navigate } from "@reach/router";
import Logo from "../images/tradeauto_logo.png"
import "../css_joe/login.css"

export default class LoginPage extends Component {
  GotoHomePage = (e) => {
    e.preventDefault();
    var userName = document.getElementById("username");
    var password = document.getElementById("password");
    if (userName.value == "" || password.value == "") {
      alert("Wrong username or password");
    } else {
      navigate(`/all-cars`);
    }
  };

  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="container  p-5">
          <div className="container mb-5">
            <img src={Logo} />
          </div>

          <div className="form-group">
            <form onSubmit={this.GotoHomePage}>

                <input
                className="bg-none w-100 p-3"
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                />

                <input
                className="bg-none w-100 p-3 mt-3"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                />

              <Button className="w-100 mt-5 sign-in-btn" type="submit">
                Sign in
              </Button>

              <div className="container d-flex justify-content-between p-2 mt-2">
              <p className="text-white f-pw-su"> Forgot password </p>
              <p className="text-white f-pw-su">Sign-up</p>
              </div>
              
            </form>

            
          </div>
        </div>
      </div>
    );
  }
}
