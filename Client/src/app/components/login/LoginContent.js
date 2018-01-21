import React from "react";
import { Form } from "./index";
import { Link } from "react-router-dom";
import {
  Paper,
  Divider,
  RaisedButton,
  LinearProgress,
} from "material-ui";
import { func, number, bool, object } from "prop-types";

const LoginContent = props => {
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
          {
            !props.isFormForgotPass ? "LOGIN" : "Forgot password"
          }
        </div>
        {
          !props.isSendMailChangePass ?
            <Form
              onSubmitForm={props.onSubmitForm}
              onChangeInput={props.onChangeInput}
              errors={props.errors}
              isLoading={props.isLoading}
              isFormForgotPass={props.isFormForgotPass}
            /> :
            <div style={{ padding: "15px" }}>
              <h3><i className="material-icons" style={{ verticalAlign: "middle" }}>check</i> We sent to your email</h3>
              <p>A message has been sent to your email.
              Please follow the instructions in the email to change your password.</p>
            </div>
        }
        <br />
        <Divider />
        <div style={{ overflow: "hidden", padding: "15px" }}>
          {
            props.isFormForgotPass ?
              <Link to="/login" style={{ color: "#24454b" }}>Login</Link>
            : <Link to="/forgotpassword" style={{ color: "#24454b" }}>Forgot your password?</Link>
          }
          <Link to="/register" style={{ color: "#24454b", float: "right" }}>Register</Link>
        </div>
        <div style={{ padding: "15px" }}>
          <RaisedButton label="FACEBOOK" primary style={{ width: "45%" }} />
          <RaisedButton label="GOOGLE" backgroundColor="#f70202" labelColor="#ffffff" style={{ width: "45%", float: "right" }} />
        </div>
      </Paper>
    </div>
  );
};

LoginContent.propTypes = {
  onSubmitForm: func.isRequired,
  onChangeInput: func.isRequired,
  valueProgress: number.isRequired,
  isLoading: bool.isRequired,
  errors: object.isRequired,
  isFormForgotPass: bool,
  isSendMailChangePass: bool,
};

LoginContent.defaultProps = {
  isFormForgotPass: false,
  isSendMailChangePass: false,
};

export default LoginContent;
