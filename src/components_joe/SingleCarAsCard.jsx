import React, { Component } from "react";
import { navigate } from "@reach/router";
import "../css_joe/view_car_details.css"
import "../css_joe/cards.css"

export default class SingleCarAsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  viewCarDetails = (e) => {
    navigate(`/cars/${this.props.id}`);
  };

  render() {
    console.log(this.props);
    var carImage = this.props.car_image;
    if (carImage !== undefined && !carImage.startsWith("http"))
      carImage = `http://localhost:4000/assets/${carImage}`;

      return (
        <div className="car-container p-2">
          <img src={carImage} alt="carimage" className="p-3" />
          <div className="container">
            <h3 className="line_bottom p-2 h3">
              {this.props.make} {this.props.model}
            </h3>
            <div className="container d-flex justify-content-between align-items-center mb-3 mt-3">
              <div className="d-flex flex-column align-items-center">
                <h5 className="text-bold">Odometer</h5> <p className="details text-muted">{this.props.odometer}km</p>
              </div>
              <div className="d-flex flex-column">
              <h5 className="text-bold"> Year</h5> <p className="details text-muted">{this.props.year}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between  align-items-center">
              <h3>${this.props.price}</h3>
            <button onClick={this.viewCarDetails} className="btn btn-danger">
              View details
            </button>
            </div>
            
          </div>
        </div>
      );
    }
  }
  
