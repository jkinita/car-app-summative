import React, { Component } from "react";
import Axios from "axios";
import * as UTILS from "../utils";

export default class Comments extends Component {
  removeComment = (e) => {
    var commentid = e.target.getAttribute("data-id");
    Axios.delete(`${UTILS.comments_url}/${commentid}`).then((res) => {
      console.log("Deleted");
      // call the parent
      this.props.refresh();
    });
  };

  render() {
    return (
      <div className="container">
        <h2 className="text-red">
          Comments: {this.props.comments.length}
        </h2>
        <div>
          {this.props.comments.map((item, i) => {
            return (
              <div className="showing-comment-e" key={i}>
                 <div
                key={i}
                style={{
                  color: "white",
                  borderBottomWidth: "3px",
                  borderBottom: "2px solid #D92546",
                  padding: "5px",
                }}

                className="container d-flex justify-content-between mb-4 mt-4 p-3"
              >
                <p>{item.comment}</p>

                <button
                  onClick={this.removeComment}
                  data-id={item._id}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
                
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
