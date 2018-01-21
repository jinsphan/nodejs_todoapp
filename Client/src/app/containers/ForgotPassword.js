import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";
import {
  LoginContent,
} from "../components/login";

import { logoutUser, forgotPassword } from "../actions/users";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
      },
      errors: {
        email: null,
      },
      valueProgress: 0,
      isLoading: false,
      isSendMailChangePass: false,
    };
    this.intervalProgress = null;
  }

  componentWillMount() {
    this.props.logoutUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userActive.isAuthentiation) {
      nextProps.history.push("/");
    }
  }

  handleSubmitForm = async e => {
    e.preventDefault();

    try {
      this.setState({
        isLoading: true,
        valueProgress: 5,
      });

      this.intervalProgress = setInterval(() => {
        this.setState({
          valueProgress: this.state.valueProgress + 5,
        });
      }, 1000);

      await this.props.forgotPassword(this.state.user.email);
      this.setState({
        isSendMailChangePass: true,
      });
    } catch (er) {
      if (er.response) {
        this.setState({
          errors: er.response.data,
        });
      } else {
        this.setState({
          errors: {
            email: "Network can not connect",
          },
        });
      }
    }
    clearInterval(this.intervalProgress);
    this.setState({
      valueProgress: 100,
    });
    setTimeout(() => {
      this.setState({
        valueProgress: 0,
        isLoading: false,
      });
    }, 500);
  }

  handleChangeInput = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  }

  render() {
    return (
      <div>
        <LoginContent
          onSubmitForm={this.handleSubmitForm}
          onChangeInput={this.handleChangeInput}
          valueProgress={this.state.valueProgress}
          isLoading={this.state.isLoading}
          errors={this.state.errors}
          isFormForgotPass
          isSendMailChangePass={this.state.isSendMailChangePass}
        />
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  forgotPassword: func.isRequired,
  logoutUser: func.isRequired,
  userActive: object.isRequired,
  history: object.isRequired,
};

const mapStateToProps = state => {
  return {
    userActive: state.userActive,
  };
};

const mapDispatchToProps = {
  forgotPassword,
  logoutUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
