import React, { Component } from "react";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class DashboardContainer extends Component {
  render() {
    return (
      <div>
        <h1>You are logged in.</h1>

        <div>
          <button onClick={this.props.logoutUser}>Logout</button>
        </div>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(DashboardContainer);
