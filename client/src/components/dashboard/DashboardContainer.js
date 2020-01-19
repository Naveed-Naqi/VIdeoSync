import React, { Component } from "react";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: 0,
      isPlaying: false
    };
  }

  handleProgress = state => {
    console.log(this.state);
    this.setState(state);
  };

  handlePause = () => {
    this.setState({
      isPlaying: false
    });
  };

  handlePlay = () => {
    this.setState({
      isPlaying: true
    });
  };

  render() {
    let { loaded, isPlaying } = this.state;
    return (
      <div>
        <h1>You are logged in.</h1>

        <ReactPlayer
          controls
          playing={isPlaying}
          onPause={this.handlePause}
          onPlay={this.handlePlay}
          onProgress={this.handleProgress}
          url="http://localhost:1234/api/users/video"
        ></ReactPlayer>

        <h1>Loading Progress</h1>
        <progress max={1} value={loaded} />

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
