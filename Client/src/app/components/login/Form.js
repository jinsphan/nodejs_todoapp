import React from "react";
import { func, object, bool } from "prop-types";

import { TextField, Checkbox, RaisedButton } from "material-ui";

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
      {
        !props.isFormForgotPass &&
        <TextField
          errorText={props.errors.password}
          floatingLabelText="Password"
          style={{ width: "100%" }}
          name="password"
          onChange={props.onChangeInput}
        />
      }
      {
        !props.isFormForgotPass &&
        <Checkbox
          label="Remember me"
          style={{ margin: "15px 0" }}
        />
      }
      <RaisedButton disabled={props.isLoading} type="submit" label={`${!props.isFormForgotPass ? "LOGIN" : "SEND"}`} labelColor="#ffffff" backgroundColor="#24454b" style={{ display: "block", textAlign: "right" }} />
    </form>
  );
};

Form.propTypes = {
  onSubmitForm: func.isRequired,
  onChangeInput: func.isRequired,
  errors: object.isRequired,
  isLoading: bool.isRequired,
  isFormForgotPass: bool.isRequired,
};

export default Form;
