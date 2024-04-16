import React from "react";
import { Toolbar, Typography, Button, Paper, Grid } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Box from "@material-ui/core/Box";
import { BackButton, AppBar, Page } from "../styles";
import { HOME, START_WORKOUT, START_WORKOUT_WEIGHT } from "../Routes";
const Value = styled(Paper)({
  height: "100%"
});

const BottomActions = styled(Box)({
  position: "sticky",
  bottom: "0.5rem",
  display: "flex",
  marginTop: "1.5rem",
  justifyContent: "center"
});

const BottomAction = styled(Button)(({ ml }) => ({
  borderRadius: "1rem",
  textTransform: "none",
  marginLeft: `${ml}`
}));

class SelectRepsPage extends React.Component {
  state = {
    valMult: 1
  };

  componentDidMount() {
    const { workouts, history, match } = this.props;

    const workout = workouts.filter(
      (workout) => workout.name === match.params.workout
    )[0];

    if (!workout) {
      history.push(START_WORKOUT);
      return;
    }
    this.setState({
      workout,
      weight: Number.parseInt(match.params.weight, 10) || 0
    });
  }

  onChangeValMult = (newMult) => {
    this.setState({
      valMult: newMult
    });
  };

  onCompleteSet = (val) => {
    const { completeSet, history } = this.props;
    const { valMult, weight, workout } = this.state;
    completeSet(workout, weight, val * valMult);
    history.push(HOME);
  };

  render() {
    const { history } = this.props;
    const { valMult, workout, weight } = this.state;
    const values = Array.from(Array(20).keys());

    if (!workout) {
      return null;
    }

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <BackButton
              color="inherit"
              aria-label="Back"
              onClick={() => history.push(START_WORKOUT_WEIGHT)}
            >
              <ArrowBack />
            </BackButton>
            <Box width={1}>
              <Typography variant="h6" color="inherit">
                {workout.name} {weight > 0 && weight + " lbs"}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Page m={1}>
          <Grid container justify="center" alignItems="stretch" spacing={2}>
            {values.map((v) => (
              <Grid key={v} item xs={6}>
                <Value elevation={2} onClick={() => this.onCompleteSet(v + 1)}>
                  <Box
                    p={2}
                    textAlign="center"
                    fontFamily="Monospace"
                    fontWeight="fontWeightMedium"
                    fontSize={48}
                  >
                    {(v + 1) * valMult}
                  </Box>
                </Value>
              </Grid>
            ))}
          </Grid>
        </Page>
        <BottomActions>
          <BottomAction
            variant="contained"
            color="primary"
            onClick={() => this.onChangeValMult(1)}
          >
            Step x 1
          </BottomAction>
          <BottomAction
            variant="contained"
            color="primary"
            onClick={() => this.onChangeValMult(2)}
            ml="1rem"
          >
            Step x 2
          </BottomAction>
          <BottomAction
            variant="contained"
            color="primary"
            onClick={() => this.onChangeValMult(5)}
            ml="1rem"
          >
            Step x 5
          </BottomAction>
        </BottomActions>
      </>
    );
  }
}

export default SelectRepsPage;
