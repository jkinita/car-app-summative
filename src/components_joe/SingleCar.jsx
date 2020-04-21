import React, { Component } from "react";
import Axios from "axios";
import * as UTILS from "../utils";
import "../css_joe/view_car_details.css"

export default class SingleCar extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    console.table(this.props);
  }

  submitComment = (e) => {
    var formData = new FormData(this.formRef.current);

    Axios.post(UTILS.add_comment, formData).then(
      (res) => {
        console.log("force reload");
        this.props.commentAdded();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    var carImage = this.props.car_image;
    if (carImage !== undefined && !carImage.startsWith("http")) {
      carImage = `${UTILS.assets_url}${carImage}`;
    }

    return (
      <div className="container p-5 d-flex flex-column justify-content-center">
        <img className="img-thumbnail" src={carImage} alt="car-img" />

        <div className="d-flex flex-column mt-4">
          <div className="container p-0 d-flex justify-content-center">
            <div className="d-flex align-items-center">
              <h1>
                {this.props.make} {this.props.model}{" "}
              </h1>
              <h2 className="ml-4">Price: ${this.props.price}</h2>
            </div>
          </div>

          <div className="container d-flex justify-content-around mt-4 mb-4">
            <div className="d-flex flex-column align-items-center">
              <h2 className="text-red">Year</h2>
              <h3 className="text-white">{this.props.year}</h3>
            </div>

            <div className="d-flex flex-column align-items-center">
              <h2 className="text-red">Odometer</h2>
              <h3 className="text-white">{this.props.odometer} km</h3>
            </div>
          </div>

          <div>
            <h3 className="text-red">Leave a comment</h3>
            <div className="container pr-0 pl-0">
              <form action="" className="d-flex" ref={this.formRef}>
                <textarea
                  className="form-control p-3"
                  placeholder="Your comment"
                  name="comment"
                ></textarea>
                <input type="hidden" name="car_name" value={this.props.model} />
                <button
                  className="btn btn-danger ml-4"
                  onClick={this.submitComment}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
