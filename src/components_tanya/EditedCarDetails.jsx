import React, { Component } from "react";
import Axios from "axios";
import * as UTILS from "../utils";
import { Button } from "reactstrap";
import { navigate } from "@reach/router";
import picture_women from "../images/women.png";
import "../css_tanya/car_details.css";
import { FiPhone } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Comments from "../components_joe/Comments";
export default class MyCarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car: {
        comments: [],
      },
      modal: false,
      deleteId: "",
    };
  }
  //we getting info from jason through server
  componentDidMount() {
    Axios.get(`${UTILS.cars_url}/${this.props.id}`).then(
      (res) => {
        this.setState({ car: res.data[0] });
      },
      (error) => {
        console.log("error = ", error);
      }
    );
  }

  removeCar = (evt) => {
    var carid = evt.target.getAttribute("data-id");
    Axios.delete(`${UTILS.cars_url}/${carid}`).then(
      (res) => {
        console.log("DELETED");
      },
      (error) => {
        console.log("error = ", error);
      }
    );
  };

  closeModal = (e) => {
    const response = e.target.getAttribute("data-response");

    if (response == "true") {
      Axios.delete(`${UTILS.cars_url}/${this.state.deleteId}`).then((res) => {
        console.log(res.data);
        this.setState({ modal: false });
        this.gotoMyProfile();
      });
    } else {
      this.setState({ modal: false });
    }
  };

  openModal = (e) => {
    var carid = e.target.getAttribute("data-id");
    this.setState({ modal: true, deleteId: carid });
  };

  gotoEditCar = (evt) => {
    var carid = evt.target.getAttribute("data-id");
    navigate(`/edit/${carid}`);
    console.log("go to edit");
  };

  gotoMyProfile = (e) => {
    navigate(`/my-profile`);
  };

  render() {
    return (
      <div className="main-content-t">
        <h1 className="header">Selling Car Details</h1>
        <div className="my-car-details-container-t">
          <div className=" row-t my-car-image-wrapper-t">
            <img
              src={`http://localhost:4000/assets/${this.state.car.car_image}`}
              alt="my-car-image"
            />
          </div>

          <div className="titles-container-t ">
            <div className="row-t car-titles-container-t">
              <h1 className="make-big-title-t"> {this.state.car.make} </h1>
              <h1 className="model-big-title-t"> {this.state.car.model} </h1>

              <h1 className="price-big-title-t"> ${this.state.car.price}</h1>
            </div>

            <div className="row-t year-odometer-container-t">
              <div className="year-conainer-t">
                <span className="my-car-sign-red">Year </span> <br />
                <span className="my-car-sign-white">{this.state.car.year}</span>
              </div>
              <div className="odometer-conainer-t">
                <span className="my-car-sign-red">Odometer </span> <br />
                <span className="my-car-sign-white">
                  {this.state.car.odometer}km
                </span>
              </div>
            </div>
          </div>
          <div className="row-t user-details-container-horisontal-t">
            <div className="  user-small-image-wrapper-t">
              <img src={picture_women} alt="women-img" />
            </div>
            <h1>Jane Doe</h1>

            <div className="phone-icon-wrapper-t">
              <FiPhone />
            </div>
            <div className="plane-icon-wrapper-t">
              <FiMail />
            </div>
          </div>
          <div className="row-t comments-container-t">
            <Comments
              className="comments-container-t"
              comments={this.state.car.comments}
            />
          </div>
          <div className="row-t buttons-container-t">
            <Button
              className="edit-btn-big-t"
              onClick={this.gotoEditCar}
              data-id={this.state.car.id}
            >
              Edit
            </Button>
            <Button
              className="delete-btn-big-t"
              onClick={this.openModal}
              data-id={this.state.car.id}
            >
              Delete
            </Button>
          </div>
          <div className="row-m button-container">
            <Button className="red-btn-t" onClick={this.gotoMyProfile}>
              Go to Profile
            </Button>
          </div>
        </div>
        <ConfirmDeleteModal
          closeModal={this.closeModal}
          modal={this.state.modal}
        />
      </div>
    );
  }
}
