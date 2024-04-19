import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Store from "store";
import {
  AppBar,
  Toolbar,
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  Button,
  Box
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import Helmet from "react-helmet";
import NewWorkoutPage from "NewWorkoutPage";
import SelectRepsPage from "CompleteSet/SelectRepsPage";
import SelectWeightPage from "CompleteSet/SelectWeightPage";
import SelectWorkoutPage from "CompleteSet/SelectWorkoutPage";
import CompletedSetList from "CompletedSetList";
import { HeaderText } from "./styles";
import StatsPage from "./StatsPage";
import {
  HOME,
  STATS,
  START_WORKOUT,
  START_WORKOUT_REPS,
  START_WORKOUT_WEIGHT,
  CREATE_WORKOUT
} from "./Routes";
import testData from './testData';

const StartSetButton = styled(Button)({
  width: "auto",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  borderRadius: "1rem",
  zIndex: 200
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#713A4F"
    },
    secondary: {
      main: "#B4A4A4"
    },
    background: {
      default: "white"
    }
  }
});

const localKey = "local_data";

class App extends React.Component {
  constructor(props) {
    super(props);
    const localData = Store.get(localKey) || {};
    this.state = {
      workouts: localData.workouts || [],
      completedSets: localData.completedSets || []
    };
  }

  save = (state) => {
    Store.set(localKey, state);
  };

  addWorkout = (workout) => {
    const { workouts } = this.state;
    this.setState((state) => {
      const newState = {
        ...state,
        workouts: [...workouts, workout]
      };
      this.save(newState);
      return newState;
    });
  };

  completeSet = (workout, weight = 0, reps = 0) => {
    const { completedSets } = this.state;

    this.setState((state) => {
      const newState = {
        ...state,
        completedSets: [
          ...completedSets,
          { workout, value: reps, weight, created: new Date().getTime() }
        ]
      };
      this.save(newState);
      return newState;
    });
  };

  deleteSet = (set) => {
    const { completedSets } = this.state;

    this.setState((state) => {
      const newState = {
        ...state,
        completedSets: completedSets.filter((s) => s.created !== set.created)
      };
      this.save(newState);
      return newState;
    });
  };

  doesWorkoutExist = (workout) => {
    return !!this.state.workouts.filter(
      (w) => w.name.toLowerCase() === workout.name.toLowerCase()
    ).length;
  };

  renderHome = (props) => {
    const { history } = props;
    const { completedSets } = this.state;

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <HeaderText variant="h6" color="inherit">
              Repple Tracker
            </HeaderText>
          </Toolbar>
        </AppBar>
        <Box m={1}>
          {
            <CompletedSetList
              history={history}
              completedSets={completedSets}
              deleteSet={this.deleteSet}
              completeSet={this.completeSet}
            />
          }
        </Box>
        <Box
          display="flex"
          position="sticky"
          m="1rem"
          bottom="1rem"
          zIndex={500}
        >
          <StartSetButton
            variant="contained"
            color="primary"
            onClick={() => props.history.push(START_WORKOUT)}
          >
            Start Set
          </StartSetButton>
        </Box>
      </>
    );
  };

  withProps = (PageComponent) => {
    return (routeProps) => (
      <PageComponent
        completeSet={this.completeSet}
        addWorkout={this.addWorkout}
        doesWorkoutExist={this.doesWorkoutExist}
        {...routeProps}
        {...this.state}
      />
    );
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Repple</title>
          <meta name="theme-color" content="#713A4F" />
          <meta
            name="description"
            content="Repple is a simple app to help track workout routines."
          />
        </Helmet>

        <CssBaseline />
        <Router>
          <Box>
            <Route exact path={HOME} render={this.renderHome} />
            <Route
              path={CREATE_WORKOUT}
              render={this.withProps(NewWorkoutPage)}
            />
            <Route exact path={STATS} render={this.withProps(StatsPage)} />
            <Route
              exact
              path={START_WORKOUT}
              render={this.withProps(SelectWorkoutPage)}
            />
            <Route
              exact
              path={START_WORKOUT_WEIGHT}
              component={this.withProps(SelectWeightPage)}
            />
            <Route
              exact
              path={START_WORKOUT_REPS}
              component={this.withProps(SelectRepsPage)}
            />
          </Box>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
