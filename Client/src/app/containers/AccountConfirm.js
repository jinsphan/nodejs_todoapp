import React, { Component } from "react";
// import { connect } from "react-redux";
import { any } from "prop-types";

import { confirmAccount } from "../actions/users";

class AccountConfirm extends Component {
  async componentWillMount() {
    const token = this.props.match.params.token;
    if (token) {
      try {
        await confirmAccount(token);
        this.props.history.push("/");
      } catch (er) {
        this.props.history.push("/login");
      }
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div>Confirm Your Account</div>
    );
  }
}

AccountConfirm.propTypes = {
  match: any.isRequired,
  history: any.isRequired,
};

export default AccountConfirm;
