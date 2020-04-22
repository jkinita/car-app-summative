import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Location, navigate } from "@reach/router";
import "./css/shared.css";

// Ella's components:
import Home from "./components_ella/Home";
import FooterNav from "./components_ella/FooterNav";


// Joe's components:
import ViewCarDetails from "./components_joe/ViewCarDetails";
import SplashPage from "./components_joe/SplashPage";
import LoginPage from "./components_joe/LoginPage";

// Tanya's components:

import AddCarAd from "./components_tanya/AddCarAd";
import EditCarAd from "./components_tanya/EditCarAd";
import MyCarDetails from "./components_tanya/MyCarDetails";
import MyProfile from "./components_tanya/MyProfile";
import SearchCars from "./components_tanya/SearchCars";
import FilteredCars from "./components_tanya/FilteredCars";
import EditedCarDetails from "./components_tanya/EditedCarDetails";

import BookTestDrive from "./components_tanya/BookTestDrive";
import BookingDEtails from "./components_tanya/BookingDetails";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <SplashPage path="/" />
          <LoginPage path="/login" />
          <Home path="/all-cars" />
          <SearchCars path="/search-cars" />
          <FilteredCars path="/filtered-cars" />
          <ViewCarDetails path="/cars/:id" />
          <AddCarAd path="/add-car" />
          <EditCarAd path="/edit/:id" />
          <MyProfile path="/my-profile" />
          <MyCarDetails path="/my-car-details/:id" />
          <EditedCarDetails path="/edited-car-details/:id" />
          <BookTestDrive path="/book-test-drive/:id" />
          <BookingDEtails path="/booking-details/:id/:bookingDate" />
        </Router>
        <Location>
          {({ location }) => <FooterNav location={location} />}
        </Location>
      </React.Fragment>
    );
  }
}
