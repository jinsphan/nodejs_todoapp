import React from "react";
import PropTypes from "prop-types";

import { TextField, FloatingActionButton } from "material-ui";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";

const Form = props => {
  return (
    <div className="Form sticky-top">
      <form onSubmit={props.handleAddTodo} >
        <TextField
          errorText={props.errors.text}
          floatingLabelText="Add something todo..."
          hintText="Message Field"
          name="todo_text"
          onChange={props.onChangeText}
          style={{
            display: "block",
            margin: "0px auto",
            minWidth: "250px",
            width: "80%",
          }}
        />

        <div className="Form__date-time">
          <DatePicker
            errorText={props.errors.date_deadline}
            autoOk
            hintText="Deadline"
            // mode="landscape"
            onChange={props.onChangeDate}
            name="todo_date_deadline"
            style={{ width: "25%", display: "inline-block", padding: "0px 10px" }}
            textFieldStyle={{ width: "100%", fontSize: "14px" }}
          />
          <TimePicker
            errorText={props.errors.time_deadline}
            autoOk
            format="24hr"
            hintText="Time"
            name="todo_time_deadline"
            onChange={props.onChangeTime}
            style={{ width: "25%", display: "inline-block", padding: "0px 10px" }}
            textFieldStyle={{ width: "100%", fontSize: "14px" }}
          />
        </div>

        <div className="Form__button">
          <FloatingActionButton
            mini
            type="submit"
            disabled={props.isAdding}
          >
            <i className="material-icons">add</i>
          </FloatingActionButton>
        </div>
      </form>
    </div>
  );
};
Form.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isAdding: PropTypes.bool.isRequired,
};

export default Form;
