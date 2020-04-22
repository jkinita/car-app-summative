import React, { Component } from "react";
import "../css/shared.css";
import * as UTILS from "../utils";
import Axios from "axios";
import SingleCar from "./SingleCar";
import Comments from "./Comments";
import { IoIosArrowBack as Back } from "react-icons/io";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

export default class ViewCarDetails extends Component {

  constructor(props) {
    super(props);
    this.state = { cars: [] };
  }

  componentDidMount() {
    this.getData();
  }

  commentAdded = (e) => {
    this.getData();
  };

  getData = (e) => {
    console.log("reload data");
    Axios.get(UTILS.cars_url + "/" + this.props.id).then(
      (res) => {
        this.setState({ cars: res.data });
      },
      (error) => {
        console.log("error = ", error);
      }
    );
  };
  gotoBookTestDrive = (e) => {
    navigate(`/book-test-drive/${this.props.id}`);
  };

  render() {
    return (
      <div className="container">
        <div className="header-w-arrow justify-content-between">
          <h1>
            <Link to="/all-cars">
              <Back color="#d92546" />
            </Link>
          </h1>
          <h1>View Details</h1>
          <h1 style={{ visibility: "hidden" }}>
            <Back />
          </h1>
        </div>
        {this.state.cars.map((car, i) => {
          return (
            <div key={Date.now()}>
              <SingleCar
                make={car.make}
                model={car.model}
                car_image={car.car_image}
                price={car.price}
                year={car.year}
                odometer={car.odometer}
                commentAdded={this.commentAdded}
              />

              <Comments refresh={this.getData} comments={car.comments} />
            </div>
          );
        })}

        <div className="container-fluid d-flex justify-content-center">
          <button onClick={this.gotoBookTestDrive} className="btn-lg btn-danger mb-3 w-100">
          Book a test drive
        </button>
        </div>
        
      </div>
    );
  }
}
