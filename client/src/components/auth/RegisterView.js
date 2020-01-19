import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import isEmpty from "is-empty";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const RegisterView = props => {
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const history = useHistory();

  const registerUser = event => {
    event.preventDefault();
    props.registerUser(state, history);
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
      <form onSubmit={registerUser} autoComplete="off">
        <div>
          <TextField
            value={state.email}
            error={!isEmpty(props.errors.email)}
            helperText={props.errors.email}
            onChange={handleChange}
            className={classes.textField}
            id="email"
            label="Email"
            variant="outlined"
          />
        </div>
        <br></br>
        <div>
          <TextField
            value={state.username}
            error={
              !isEmpty(props.errors.registerUsername) ||
              !isEmpty(props.errors.userFound)
            }
            helperText={props.errors.registerUsername || props.errors.userFound}
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
            error={!isEmpty(props.errors.registerPassword)}
            helperText={props.errors.registerPassword}
            onChange={handleChange}
            className={classes.textField}
            id="password"
            type="password"
            label="Password"
            variant="outlined"
          />
        </div>
        <br></br>
        <div>
          <TextField
            value={state.confirmPassword}
            error={!isEmpty(props.errors.confirmPassword)}
            helperText={props.errors.confirmPassword}
            onChange={handleChange}
            className={classes.textField}
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            variant="outlined"
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
            Register
          </Button>
        </div>
        <br></br>
        <div>
          <Link to="/">Want to login instead?</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterView;
