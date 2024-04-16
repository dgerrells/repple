import React from 'react';
import { format as timeAgo } from 'timeago.js';
import { Typography, Card, CardContent, Divider } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { TextStatHighlight } from 'styles';
import {
  getTotalWeight,
  getStartWorkoutTime,
  getTotalReps,
  getLastCompletedSetTime
} from './StatsUtils';

class TotalStats extends React.Component {
  state = {};
  componentDidMount = () => {
    const { completedSets } = this.props;
    const totalSets = completedSets.length;
    this.setState({
      totalWorkoutTime: timeAgo(getStartWorkoutTime(completedSets)),
      totalSets,
      totalReps: getTotalReps(completedSets),
      totalWeight: getTotalWeight(completedSets),
      lastCompletedSetTime: timeAgo(getLastCompletedSetTime(completedSets))
    });
  };

  render() {
    const {
      totalSets,
      totalReps,
      totalWorkoutTime,
      totalWeight,
      lastCompletedSetTime
    } = this.state;
    if (!totalSets) {
      return null;
    }
    return (
      <Box m={2}>
        <Card>
          <CardContent>
            <Typography color="textSecondary">
              You started working out
              <TextStatHighlight>{totalWorkoutTime}</TextStatHighlight>
              Good job!
            </Typography>
            <Typography color="textSecondary">
              You have completed a total of
              <TextStatHighlight>{totalSets}</TextStatHighlight>
              sets for a total of
              <TextStatHighlight>{totalReps}</TextStatHighlight>
              reps. Awesome!
            </Typography>
            <Typography color="textSecondary">
              Your last workout was
              <TextStatHighlight>{lastCompletedSetTime}</TextStatHighlight>
            </Typography>
            {totalWeight > 0 && (
              <Typography color="textSecondary">
                All together you have pushed, pulled, and lifted
                <TextStatHighlight>{totalWeight} lbs</TextStatHighlight>
                or
                <TextStatHighlight>
                  {Math.floor(totalWeight / 2.2046)} kg
                </TextStatHighlight>
                Woh!
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default TotalStats;
