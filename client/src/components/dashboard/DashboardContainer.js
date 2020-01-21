import React, { Component } from "react";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import socketIOClient from "socket.io-client";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: 0,
      isPlaying: false,
      played: 0
    };
  }

  socket = socketIOClient("http://127.0.0.1:1234");

  componentDidMount() {
    this.socket.on("pause", data => {
      this.setState({ isPlaying: data });
    });
  }

  handleProgress = state => {
    if (this.state.loaded !== 1) {
      this.setState(state);
    }
  };

  handlePause = () => {
    this.setState({
      isPlaying: false
    });

    this.socket.emit("pause", false);
  };

  handlePlay = () => {
    this.setState({
      isPlaying: true
    });
  };

  handleSeekMouseDown = e => {
    this.setState({ seeking: true });
  };

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value + 1) });
  };

  handleSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  ref = player => [(this.player = player)];

  render() {
    let { loaded, isPlaying, played } = this.state;
    return (
      <div>
        <h1>You are logged in.</h1>

        <ReactPlayer
          ref={this.ref}
          controls
          playing={isPlaying}
          onPause={this.handlePause}
          onPlay={this.handlePlay}
          onProgress={this.handleProgress}
          onSeek={this.handleSeek}
          url="http://localhost:1234/api/users/video"
        ></ReactPlayer>

        <h1>Loading Progress</h1>
        <progress max={1} value={loaded} />

        {/* TODO: Will do more research about the react-player and determine if there is an easier way to do this without creating an external seek bar */}
        <div>
          <h1>Seek</h1>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={this.handleSeekMouseDown}
            onChange={this.handleSeekChange}
            onMouseUp={this.handleSeekMouseUp}
          />
        </div>

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
