import React from "react";
import { func, object, bool } from "prop-types";

import { TextField, RaisedButton } from "material-ui";

const Form = props => {
  return (
    <form onSubmit={props.onSubmitForm}>
      <TextField
        errorText={props.errors.password}
        floatingLabelText="New Passwrord"
        style={{ width: "100%", margin: 0 }}
        name="password"
        onChange={props.onChangeInput}
      />
      <TextField
        errorText={props.errors.cfpassword}
        floatingLabelText="Confirm"
        style={{ width: "100%" }}
        name="cfpassword"
        onChange={props.onChangeInput}
      />
      <RaisedButton disabled={props.isLoading} type="submit" label="Change password" labelColor="#ffffff" backgroundColor="#24454b" style={{ display: "block", textAlign: "right" }} />
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
