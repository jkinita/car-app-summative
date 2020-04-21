import React, { Component } from "react";
import { Button } from "reactstrap";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import * as UTILS from "../utils";
import { navigate } from "@reach/router";
import "../css/shared.css";
import "../css_tanya/style.css";
import "../css_tanya/addcar_form.css";
import "../css_tanya/login.css";

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
      <div className="main-content-t">
        <div className="card form-container-t">
          <div className="logo-container-t">
            <h1>TradeAuto</h1>
            <span>Buy&Sell</span>
          </div>

          <div className="card-body   pt-0">
            <form onSubmit={this.GotoHomePage}>
              <div className=" main-redline-input container-t">
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </div>

              <div className=" main-redline-input md-form">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>

              <div className=" main-redline-input forgot-password-caption-t">
                <span> Forgot password ></span>
              </div>

              <Button className=" sign-in-btn-t red-btn-t" type="submit">
                Sign in
              </Button>
            </form>

            <span className="sign-up-caption-t ">Sign-up</span>
          </div>
        </div>
      </div>
    );
  }
}
