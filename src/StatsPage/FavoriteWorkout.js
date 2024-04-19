import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import { format as timeAgo } from 'timeago.js';
import Box from '@material-ui/core/Box';
import { TextStatHighlight } from 'styles';
import { getFavoriteWorkoutStats } from './StatsUtils';

class FavoriteWorkout extends React.Component {
  state = {};
  componentDidMount = () => {
    const { sets, workouts } = this.props;
    this.setState({
      stats: getFavoriteWorkoutStats(sets, workouts)
    });
  };

  render() {
    const { stats } = this.state;
    if (!stats) {
      return null;
    }

    return (
      <Box m={2}>
        <Card>
          <CardContent>
            <Typography color="textSecondary">
              <TextStatHighlight>{stats.name}</TextStatHighlight>
              is your favorite workout where you completed
              <TextStatHighlight>{stats.totalSets}</TextStatHighlight>
              sets for a total of
              <TextStatHighlight>{stats.totalReps}</TextStatHighlight>
              reps
              {stats.totalWeight > 0 && (
                <Typography color="textSecondary" component="span">
                  {' '}
                  with
                  <TextStatHighlight>{stats.totalWeight} lbs</TextStatHighlight>
                  moved
                </Typography>
              )}
              !
            </Typography>
            {stats.pr > 0 && (
              <Typography color="textSecondary">
                Your PR is
                <TextStatHighlight>{stats.pr} lbs</TextStatHighlight>
                and was completed {timeAgo(stats.prTime)}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default FavoriteWorkout;
