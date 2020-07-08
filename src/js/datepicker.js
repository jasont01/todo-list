import React from "react";
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DueDatePicker extends React.Component {
  state = {
    startDate: this.props.startDate
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <DatePicker
        showPopperArrow={false}
        selected={this.state.startDate}
        onChange={this.handleChange}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        className="form-control form-control-sm date-picker"
      />
    );
  }
}

export function renderDatePicker(node, date=new Date()) {

  ReactDOM.render(<DueDatePicker startDate={date} />,node);
}

//document.getElementById('date-picker')