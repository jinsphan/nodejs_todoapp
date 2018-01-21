import React, { Component } from "react";
import { func, object, any } from "prop-types";
import {
  Route,
  Redirect,
} from "react-router-dom";
import { checkAuth } from "../actions/users";
import CircularProgress from "material-ui/CircularProgress";
import { connect } from "react-redux";

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckedAuth: false,
    };
  }

  async componentWillMount() {
    await this.props.checkAuth();
    this.setState({
      isCheckedAuth: true,
    });
  }

  render() {
    const { component: ComponentMain, ...rest } = this.props;
    return (
      <div>
        {
          this.state.isCheckedAuth
          ? <Route
            {...rest}
            render={props => (
              this.props.userActive.isAuthentiation
                ? (<ComponentMain {...props} />)
                : (<Redirect to={{ pathname: "/login" }} />)
            )}
          />
          : <div className="-text-center"><CircularProgress /></div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    userActive: state.userActive,
  });
};

const mapDispatchToProps = {
  checkAuth,
};

AuthRoute.propTypes = {
  checkAuth: func.isRequired,
  userActive: object.isRequired,
  component: any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
