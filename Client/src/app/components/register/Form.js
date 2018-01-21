import React from "react";
import { func, object, bool } from "prop-types";

import { TextField, RaisedButton } from "material-ui";

const Form = props => {
  return (
    <form onSubmit={props.onSubmitForm}>
      <TextField
        errorText={props.errors.email}
        floatingLabelText="Email"
        style={{ width: "100%", margin: 0 }}
        name="email"
        onChange={props.onChangeInput}
      />
      <TextField
        errorText={props.errors.fullname}
        floatingLabelText="Fullname"
        style={{ width: "100%" }}
        name="fullname"
        onChange={props.onChangeInput}
      />
      <TextField
        errorText={props.errors.password}
        floatingLabelText="Password"
        style={{ width: "100%" }}
        name="password"
        onChange={props.onChangeInput}
      />
      <TextField
        errorText={props.errors.confirm}
        floatingLabelText="Confirm"
        style={{ width: "100%" }}
        name="confirm"
        onChange={props.onChangeInput}
      />
      <RaisedButton disabled={props.isLoading} type="submit" label="REGISTER NOW" labelColor="#ffffff" backgroundColor="#24454b" style={{ display: "block", textAlign: "right", marginTop: "25px" }} />
    </form>
  );
};

Form.propTypes = {
  onSubmitForm: func.isRequired,
  onChangeInput: func.isRequired,
  errors: object.isRequired,
  isLoading: bool.isRequired,
};

export default Form;
