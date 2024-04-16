import React from 'react';
import {
  Toolbar,
  Paper,
  Typography,
  Card,
  CardContent
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import { Doughnut } from 'react-chartjs-2';
import FavoriteWorkout from './FavoriteWorkout';
import { BackButton, AppBar, Page } from '../styles';
import TotalStats from './TotalStats';
import WorkoutStats from './WorkoutStats';
import WeekdayStats from './WeekdayStats';

class StatsPage extends React.Component {
  state = {};
  componentDidMount() {
    const { completedSets, workouts } = this.props;

    const setMap = {};
    completedSets.forEach(set => {
      const list = setMap[set.workout.name] || [];
      list.push(set);
      setMap[set.workout.name] = list;
    });

    this.setState({
      setMap
    });
  }

  render() {
    const { history, workouts, completedSets } = this.props;
    const { setMap } = this.state;

    const noStats = (
      <Box textAlign="center" mt={4}>
        <Typography variant="h5">
          No stats to display until you complete a workout.
        </Typography>
      </Box>
    );

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <BackButton
              color="inherit"
              aria-label="Back"
              onClick={() => history.push('/')}
            >
              <ArrowBack />
            </BackButton>
            <Box width={1}>
              <Typography variant="h6" color="inherit">
                Workout Stats
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        {completedSets.length === 0 && noStats}
        {setMap && completedSets.length > 0 && (
          <Page>
            <TotalStats completedSets={completedSets} />
            <FavoriteWorkout sets={completedSets} workouts={workouts} />
            <WeekdayStats sets={completedSets} />
            <WorkoutStats setMap={setMap} workouts={workouts} />
          </Page>
        )}
      </>
    );
  }
}

export default StatsPage;
