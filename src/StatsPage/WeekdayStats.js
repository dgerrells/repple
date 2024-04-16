import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Typography, Card, CardContent } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { getWeekdayStats } from './StatsUtils';
import { TextStatHighlight } from 'styles';

class TotalStats extends React.Component {
  state = {};
  componentDidMount = () => {
    const { sets } = this.props;
    const weekdayStats = getWeekdayStats(sets);

    this.setState({
      favDayOfWeek: weekdayStats.favWeekday,
      leastFavDayOfWeek: weekdayStats.leastFavWeekday,
      weekdayChartData: {
        labels: weekdayStats.labels,
        datasets: [
          {
            data: weekdayStats.chartData,
            backgroundColor: Object.values(blueGrey)
          }
        ]
      },
      options: {
        legend: {
          position: 'left'
        }
      }
    });
  };

  render() {
    const {
      weekdayChartData,
      options,
      favDayOfWeek,
      leastFavDayOfWeek
    } = this.state;
    if (!weekdayChartData) {
      return null;
    }
    return (
      <Box m={2}>
        <Card>
          <CardContent>
            <Typography color="textSecondary">
              You workout most often on a
              <TextStatHighlight>{favDayOfWeek}</TextStatHighlight>
              and least often on a
              <TextStatHighlight>{leastFavDayOfWeek}</TextStatHighlight>
            </Typography>
            <Typography color="textSecondary" />
            <Box m={2}>
              <Pie data={weekdayChartData} options={options} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default TotalStats;
