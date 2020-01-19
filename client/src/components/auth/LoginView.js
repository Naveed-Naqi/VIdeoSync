import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import isEmpty from "is-empty";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const LoginView = props => {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const loginUser = event => {
    event.preventDefault();
    props.loginUser(state);
  };

  const handleChange = event => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  const useStyles = makeStyles(theme => ({
    textField: {
      width: "50%"
    },
    button: {
      width: "35%"
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <form onSubmit={loginUser} autoComplete="off">
        <div>
          <TextField
            value={state.username}
            error={
              !isEmpty(props.errors.username) ||
              !isEmpty(props.errors.userNotFound)
            }
            helperText={props.errors.username || props.errors.userNotFound}
            onChange={handleChange}
            className={classes.textField}
            id="username"
            label="Username"
            variant="outlined"
          />
        </div>
        <br></br>
        <div>
          <TextField
            value={state.password}
            error={
              !isEmpty(props.errors.password) ||
              !isEmpty(props.errors.credentials)
            }
            helperText={props.errors.password || props.errors.credentials}
            onChange={handleChange}
            className={classes.textField}
            id="password"
            label="Password"
            variant="outlined"
            type="password"
          />
        </div>
        <br></br>
        <div>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </div>

        <br></br>
        <div>
          <Link to="/register">Need an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
