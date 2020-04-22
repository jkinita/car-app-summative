import React, { Component } from "react";
import "../css_ella/splash.css";
import { navigate } from "@reach/router";
import Logo from "../images/tradeauto_logo.png"

export default class SplashPage extends Component {
  logIn = (e) => {
    navigate(`/login`);
  };

  render() {
    return (
      <div className="container vh-100 d-flex" onClick={this.logIn}>
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <img src={Logo} />
        </div>
      </div>
    );
  }
}
