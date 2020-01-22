import React, { Component } from "react";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import socketIOClient from "socket.io-client";
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'

import "./Dashboard.css";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: 0,
      isPlaying: false,
      played: 0,
      volume: 0,
    };
  }

  socket = socketIOClient("http://54.196.177.179:1234");

  componentDidMount() {
    this.socket.on("pause", data => {
      this.setState({ isPlaying: data });
    });

    this.socket.on("play", data => {
      this.setState({ isPlaying: data });
    });

    this.socket.on("seek", data => {
      this.player.seekTo(parseFloat(data));

      this.setState({
        played: parseFloat(data)
      });
    });
  }

  handleProgress = state => {
    if (this.state.loaded !== 1) {
      this.setState(state);
    }
  };

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

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

    this.socket.emit("play", true);
  };

  handleSeekMouseDown = e => {
    this.setState({ seeking: true });
  };

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.socket.emit("seek", e.target.value);
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  handlePlayPause = () => {
    this.setState({ isPlaying: !this.state.isPlaying })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) }, console.log(e.target.value))
  }

  ref = player => [(this.player = player)];

  render() {
    let { loaded, isPlaying, played, volume } = this.state;
    return (
      <div>
        <h1>You are logged in.</h1>
        <div className="center">
          <ReactPlayer
            ref={this.ref}
            controls
            playing={isPlaying}
            onPause={this.handlePause}
            onPlay={this.handlePlay}
            volume={volume}
            onProgress={this.handleProgress}
            onSeek={this.handleSeek}
            url="https://www.youtube.com/watch?v=AJXqzB75pW8"
          ></ReactPlayer>
        </div>

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
          <h1>Volume</h1>
          <input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
        </div>

        <button onClick={this.handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={this.handleClickFullscreen}>Fullscreen</button>

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
