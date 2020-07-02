import React from "react";
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DueDatePicker extends React.Component {
  state = {
    startDate: new Date()
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
        className="form-control form-control-sm"
        id="new-item-date"
      />
    );
  }
}

ReactDOM.render(
  <DueDatePicker />,
  document.getElementById('date-picker')
);