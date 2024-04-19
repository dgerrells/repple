import React from 'react';
import { Toolbar, Button, Paper } from '@material-ui/core';
import Store from 'store';
import { styled } from '@material-ui/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import { BackButton, AppBar, Page } from 'styles';
import { HOME, START_WORKOUT, CREATE_WORKOUT } from 'Routes';

const NewWorkoutButton = styled(Button)({
  width: 'auto',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  borderRadius: '1rem',
  zIndex: 200
});

const SearchInput = styled(InputBase)({
  background: 'rgba(255, 255, 255, 0.15)',
  paddingRight: '1rem',
  paddingLeft: '1rem',
  color: 'white',
  borderRadius: '6px',
  width: '100%',
});
const WorkoutName = styled(Box)({
  textTransform: 'capitalize'
});

class SelectWorkoutPage extends React.Component {
  pageStateKey = 'StartSetPage';
  state = {
    filter: ''
  };

  componentDidMount() {
    const localPageState = Store.get(this.pageStateKey) || {};
    this.setState(localPageState);
  }

  onChangeFilter = event => {
    this.setState({ filter: event.target.value }, () =>
      Store.set(this.pageStateKey, this.state)
    );
  };

  render() {
    const { workouts, history } = this.props;
    const { filter } = this.state;

    return (
      <>
        <AppBar>
          <Toolbar>
            <BackButton
              color="inherit"
              aria-label="Back"
              onClick={() => history.push(HOME)}
            >
              <ArrowBack />
            </BackButton>
            <Box textAlign="center" width={1}>
              <SearchInput
                placeholder="Filter..."
                value={filter}
                onChange={this.onChangeFilter}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Page p={1}>
          {workouts.length === 0 && (
            <WorkoutName p={2} m={1} textAlign="center" fontFamily="Monospace">
              No workouts. Tab below to add one.
            </WorkoutName>
          )}
          {workouts
            .filter(workout => {
              return (
                !filter ||
                workout.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
              );
            })
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(workout => (
              <Paper elevation={2} key={workout.name}>
              <WorkoutName
                  p={2}
                  m={1}
                  textAlign="center"
                  fontFamily="Monospace"
                  onClick={() =>
                    history.push(`${START_WORKOUT}/${workout.name}`)
                  }
                >
                  {workout.name}
                </WorkoutName>
              </Paper>
            ))}
        </Page>
        <Box
          display="flex"
          position="sticky"
          m="1rem"
          bottom="1rem"
          zIndex={500}
        >
          <NewWorkoutButton
            color="primary"
            variant="contained"
            onClick={() => history.push(CREATE_WORKOUT)}
          >
            Add Workout
          </NewWorkoutButton>
        </Box>
      </>
    );
  }
}

export default SelectWorkoutPage;
