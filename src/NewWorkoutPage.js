import React from "react";
import { Toolbar, Typography, Button, TextField } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Box from "@material-ui/core/Box";
import { START_WORKOUT } from "./Routes";
import { BackButton, AppBar } from "./styles";

class NewWorkoutPage extends React.Component {
  state = {
    workoutName: ""
  };

  onNameChange = (event) => {
    this.setState({
      workoutName: event.target.value,
      helperText: ""
    });
  };

  onAddWorkout = (event) => {
    const { workoutName } = this.state;
    const { addWorkout, history, doesWorkoutExist } = this.props;
    const workout = {
      name: workoutName.trim(),
      created: new Date().getTime()
    };
    if (doesWorkoutExist(workout)) {
      this.setState({
        helperText: "That name already exists"
      });
      return;
    }
    addWorkout(workout);
    this.setState({
      workoutName: "",
      helperText: ""
    });
    history.goBack();
  };

  render() {
    const { history } = this.props;
    const { workoutName, helperText } = this.state;
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <BackButton
              color="inherit"
              aria-label="Back"
              onClick={() => history.push(START_WORKOUT)}
            >
              <ArrowBack />
            </BackButton>
            <Box width={1}>
              <Typography variant="h6" color="inherit">
                New workout
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Box m={1} textAlign="center">
          <TextField
            required
            id="outlined-required"
            label="Workout Name"
            placeholder="...box jump"
            margin="normal"
            value={workoutName}
            onChange={this.onNameChange}
            variant="outlined"
            fullWidth
            helperText={helperText}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={this.onAddWorkout}
            disabled={!workoutName.trim()}
          >
            Add workout
          </Button>
        </Box>
      </>
    );
  }
}

export default NewWorkoutPage;
