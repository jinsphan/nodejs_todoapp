import React from "react";
import { Form } from "./index";
import { Link } from "react-router-dom";
import {
  Paper,
  Divider,
  LinearProgress,
} from "material-ui";
import { func, number, bool, object } from "prop-types";

const RegisterContent = props => {
  return (
    <div className="login-container">
      <Paper style={{ width: "350px", paddingBottom: "0px" }} zDepth={2}>
        {
          props.isLoading &&
            <LinearProgress
              value={props.valueProgress}
              mode="determinate"
              color="#ffffff"
              style={{ backgroundColor: "#244541" }}
            />
        }
        <div style={{ padding: "10px 10px", backgroundColor: "#24454b", fontSize: "30px", color: "white", textAlign: "center" }}>
          REGISTER
        </div>
        {
          !props.isRegisterSuccessfull ?
            <Form
              onSubmitForm={props.onSubmitForm}
              onChangeInput={props.onChangeInput}
              errors={props.errors}
              isLoading={props.isLoading}
            /> :
            <div style={{ padding: "15px" }}>
              <h3><i className="material-icons" style={{ verticalAlign: "middle" }}>check</i> Register successfully</h3>
              <p>A confirmation message has been sent to your register email address.
              Please follow the instructions in the email to active your account.</p>
            </div>
        }
        <br />
        <Divider />
        <div style={{ overflow: "hidden", padding: "15px" }}>
          <Link to="/forgotpassword" style={{ color: "#24454b" }}>Forgot your password?</Link>
          <Link to="/login" style={{ color: "#24454b", float: "right" }}>Login</Link>
        </div>
      </Paper>
    </div>
  );
};

RegisterContent.propTypes = {
  onSubmitForm: func.isRequired,
  onChangeInput: func.isRequired,
  valueProgress: number.isRequired,
  isLoading: bool.isRequired,
  errors: object.isRequired,
  isRegisterSuccessfull: bool.isRequired,
};

export default RegisterContent;
