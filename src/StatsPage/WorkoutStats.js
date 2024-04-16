import React from 'react';
import moment from 'moment';
import { Typography, Card, CardContent } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { TextStatHighlight } from 'styles';
import { Bar } from 'react-chartjs-2';
const options = {
  scales: {
    yAxes: [
      {
        ticks: { min: 0, maxRotation: 30 }
      }
    ],
    xAxes: [
      {
        ticks: {
          maxRotation: 20,
          min: 'March'
        }
      }
    ]
  }
};

class WorkoutStats extends React.Component {
  state = {};
  componentDidMount = () => {
    const { workouts, setMap } = this.props;
    if (!setMap) {
      return;
    }

    const workoutData = workouts
      .filter(workout => setMap[workout.name])
      .map(workout => {
        const sets = setMap[workout.name];
        const totalReps = sets.reduce((sum, set) => sum + set.value, 0);
        const totalSets = sets.length;
        let weightPR = 0;

        const repsPerDay = {};
        let labels = new Set();
        sets.forEach(set => {
          const date = moment(set.created).format('MMM Do');
          repsPerDay[date] = (repsPerDay[date] || 0) + set.value;
          labels.add(date);
          weightPR = Math.max(weightPR, set.weight || 0);
        });
        labels = Array.from(labels);
        const values = labels.map(date => repsPerDay[date]);

        const chartData = {
          labels: Array.from(labels),
          datasets: [
            {
              label: workout.name,
              pointHoverRadius: 5,
              pointRadius: 3,
              data: values,
              fill: false,
              backgroundColor: '#713A4F'
            }
          ]
        };
        return {
          chartData,
          totalReps,
          totalSets,
          weightPR,
          name: workout.name
        };
      });
    this.setState({ workoutData });
  };

  render() {
    const { workoutData } = this.state;
    if (!workoutData) {
      return null;
    }
    return workoutData.map((data, index) => (
      <Box m={2} key={index}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="primary">
              {data.name}
            </Typography>
            <Typography>
              Total Sets:
              <TextStatHighlight size="h6">{data.totalSets}</TextStatHighlight>
            </Typography>
            <Typography>
              Total Reps:
              <TextStatHighlight size="h6">{data.totalReps}</TextStatHighlight>
            </Typography>
            {data.weightPR > 0 && (
              <Typography>
                PR:
                <TextStatHighlight size="h6">
                  {data.weightPR} lbs
                </TextStatHighlight>
              </Typography>
            )}
          </CardContent>
          <Box m={2}>
            <Bar data={data.chartData} options={options} />
          </Box>
        </Card>
      </Box>
    ));
  }
}

export default WorkoutStats;
