import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default class YearDropdown extends Component {
  render() {
    var years = Array.from(Array(20).keys()).map((y) => y + 2001);

    return (
      <UncontrolledDropdown onClick={this.props.selectYear}>
        <DropdownToggle caret>{this.props.selectedYear}</DropdownToggle>
        <DropdownMenu className="select-t">
          {years.map((year) => (
            <DropdownItem key={year} data-year={year}>
              {year}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}
