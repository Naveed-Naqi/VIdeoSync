import React, { Component } from "react";
import { loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginView from "./LoginView";

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    let { auth, history } = this.props;
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { auth, history } = this.props;

    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <br></br>
        <br></br>

        <LoginView
          errors={this.props.errors}
          loginUser={this.props.loginUser}
        ></LoginView>
      </div>
    );
  }
}

LoginContainer.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(LoginContainer);
