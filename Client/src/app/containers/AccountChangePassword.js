import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object, any } from "prop-types";
import {
  ChangePasswordContent,
} from "../components/changepassword";

import { checkToken, changePassword } from "../actions/users";

class AccountChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        password: "",
        cfpassword: "",
      },
      errors: {
        password: null,
        cfpassword: null,
      },
      valueProgress: 0,
      isLoading: false,
    };
    this.intervalProgress = null;
  }

  async componentWillMount() {
    const token = this.props.match.params.token;
    if (token) {
      try {
        await checkToken(token);
      } catch (er) {
        this.props.history.push("/login");
      }
    } else {
      this.props.history.push("/login");
    }
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

      await this.props.changePassword(this.state.user, this.props.match.params.token);
      clearInterval(this.intervalProgress);
      this.props.history.push("/");
    } catch (er) {
      console.log(er.response.data);
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
            password: "Network can not connect",
            cfpassword: null,
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
        <ChangePasswordContent
          onSubmitForm={this.handleSubmitForm}
          onChangeInput={this.handleChangeInput}
          valueProgress={this.state.valueProgress}
          isLoading={this.state.isLoading}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

AccountChangePassword.propTypes = {
  match: any.isRequired,
  history: any.isRequired,
  userActive: object.isRequired,
  changePassword: func.isRequired,
};

const mapStateToProps = state => {
  return {
    userActive: state.userActive,
  };
};

const mapDispatchToProps = {
  changePassword,
};


export default connect(mapStateToProps, mapDispatchToProps)(AccountChangePassword);
