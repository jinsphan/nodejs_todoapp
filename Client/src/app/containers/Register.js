import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object } from "prop-types";
import {
  RegisterContent,
} from "../components/register";

import { registerUser, logoutUser } from "../actions/users";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        fullname: "",
        password: "",
        confirm: "",
      },
      errors: {
        email: null,
        fullname: null,
        password: null,
        confirm: null,
      },
      valueProgress: 0,
      isLoading: false,
      isRegisterSuccessfull: false,
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

      await this.props.registerUser(this.state.user);
      clearInterval(this.intervalProgress);
      this.setState({
        isRegisterSuccessfull: true,
        valueProgress: 100,
      });
      setTimeout(() => {
        this.setState({
          valueProgress: 0,
          isLoading: false,
        });
      }, 500);
    } catch (er) {
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
      if (er.response) {
        this.setState({
          errors: er.response.data,
        });
      } else {
        this.setState({
          errors: {
            email: "Network can not connect",
            password: null,
          },
        });
      }
    }
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
        <RegisterContent
          onSubmitForm={this.handleSubmitForm}
          onChangeInput={this.handleChangeInput}
          valueProgress={this.state.valueProgress}
          isLoading={this.state.isLoading}
          errors={this.state.errors}
          isRegisterSuccessfull={this.state.isRegisterSuccessfull}
        />
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: func.isRequired,
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
  registerUser,
  logoutUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);
