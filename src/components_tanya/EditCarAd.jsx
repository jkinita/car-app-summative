import React, { Component } from "react";
import Axios from "axios";
import { navigate } from "@reach/router";
import * as UTILS from "../utils";
import { Button } from "reactstrap";
import CarMakeDropdown from "./CarMakeDropdown";
import YearDropdown from "./YearDropdown";
import "../css_tanya/addcar_form.css";

export default class EditCarAd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: Date.now(),
      car: {},
      isLoaded: false,
      selectedMake: "",
      selectedYear: "",
      previewURL: "",
      filename: "",
    };
    this.formRef = React.createRef();
  }

  selectMake = (evt) => {
    var make = evt.target.getAttribute("data-make");
    if (make == null) return;
    this.setState({ selectedMake: make });
  };

  selectYear = (evt) => {
    var year = evt.target.getAttribute("data-year");
    if (year == null) return;
    this.setState({ selectedYear: year });
  };

  componentDidMount() {
    console.log(`${UTILS.cars_url}/${this.props.id}`);
    Axios.get(`${UTILS.cars_url}/${this.props.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          car: res.data[0],
          isLoaded: true,
          selectedMake: res.data[0].make,
          selectedYear: res.data[0].year,
        });
      })
      .catch((err) => console.log(err));
  }

  EditCarAd = (e) => {
    e.preventDefault();
    var formData = new FormData(this.formRef.current);

    // forms with images look a bit different - we need to add this line.
    var settings = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    Axios.put(`${UTILS.cars_url}/${this.props.id}`, formData, settings).then(
      (res) => {
        // do somenthing, update form for user again ?
        console.log(res);
        navigate(`/edited-car-details/${this.props.id}`);
      }
    );
  };
  separateNumber = () => {
    var numberToCovert = document.querySelector(".odometer-input-t");
    var val = numberToCovert.value.replace(/,/g, "");

    var output = val.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    numberToCovert.value = output;
  };

  onFileUpdate = (e) => {
    if (e.target.files.length == 0) return;
    console.log(e.target.files[0].name);
    this.setState({
      filename: e.target.files[0].name,
      //create address for img:
      previewURL: window.URL.createObjectURL(e.target.files[0]),
    });
  };

  render() {
    // make a local variable from the state.car
    const { car_image } = this.state.car;
    const image_path = UTILS.assets_url + car_image;
    console.log("hello ", this.state.isLoaded);

    return (
      <div className="main-content-t">
        <h1 className="header">Edit details</h1>
        <h2 className="vehicle-details-title">Vehicle details</h2>

        <div className="card form-container-t">
          <div className="card-body   pt-0">
            <form ref={this.formRef} onSubmit={this.EditCarAd}>
              <div className=" main-redline-input year-container-t  ">
                <input
                  id="year"
                  type="hidden"
                  name="year"
                  value={this.state.selectedYear}
                />
                <YearDropdown
                  selectedYear={this.state.selectedYear}
                  selectYear={this.selectYear}
                />
              </div>

              <div className=" main-redline-input md-form container-t">
                <input
                  type="hidden"
                  name="make"
                  placeholder="Make"
                  value={this.state.selectedMake}
                />
                <CarMakeDropdown
                  selectMake={this.selectMake}
                  selectedMake={this.state.selectedMake}
                />
              </div>

              <div className=" main-redline-input md-form">
                <input
                  id="model"
                  type="text"
                  name="model"
                  placeholder="Model"
                  defaultValue={this.state.car.model}
                />
              </div>
              <div className="main-redline-input md-form">
                <input
                  className="odometer-input-t"
                  id="odometer"
                  name="odometer"
                  placeholder="Odometer"
                  defaultValue={this.state.car.odometer}
                  onChange={this.separateNumber}
                />
              </div>

              <div className=" main-redline-input md-form">
                <input
                  className="price-input-t"
                  id="price"
                  name="price"
                  placeholder="Price"
                  defaultValue={this.state.car.price}
                />
              </div>
              <div className="md-form">
                <input
                  id="seller_name"
                  type="hidden"
                  name="seller_name"
                  defaultValue="user"
                />
              </div>
              <input id="id" type="hidden" name="id" value={this.props.id} />
              <div className=" main-redline-input md-form image-upload-container-t">
                <label
                  style={{ fontSize: "1.5rem", color: "gray" }}
                  htmlFor="files"
                >
                  <div className="caption-and-img-container-t">
                    <div className="select-image-caption-t">Select Image:</div>

                    {this.state.filename == "" && (
                      <div className="image-for-input-wrapper-t">
                        <img src={image_path} />
                      </div>
                    )}
                    {this.state.filename != "" && (
                      <div className="image-for-input-wrapper-t">
                        <img src={this.state.previewURL} alt="image" />
                      </div>
                    )}
                  </div>
                </label>

                <input
                  className="hidden-input-t"
                  id="files"
                  style={{ visibility: "hidden" }}
                  name="car_image"
                  type="file"
                  onChange={this.onFileUpdate}
                  defaultValue={car_image}
                ></input>
              </div>
              <Button
                className="red-btn-t"
                type="submit"
                data-id={this.state.car.id}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
