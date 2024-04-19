import React from 'react';
import { Toolbar, Typography, Button, Paper, Grid } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import { BackButton, AppBar, Page } from 'styles';
import { START_WORKOUT } from 'Routes';

const Value = styled(Paper)({
  height: '100%'
});

const BottomActions = styled(Box)({
  position: 'sticky',
  bottom: '0.5rem',
  display: 'flex',
  marginTop: '1.5rem',
  justifyContent: 'center'
});

const BottomAction = styled(Button)(({ ml }) => ({
  borderRadius: '1rem',
  textTransform: 'none',
  marginLeft: `${ml}`
}));

class SelectWeightPage extends React.Component {
  state = {
    valMult: 5
  };

  componentDidMount() {
    const { workouts, history, match } = this.props;

    const workout = workouts.filter(
      workout => workout.name === match.params.workout
    )[0];

    if (!workout) {
      history.push(START_WORKOUT);
      return;
    }
    this.setState({
      workout
    });
  }

  onChangeValMult = newMult => {
    this.setState({
      valMult: newMult
    });
  };

  onSelectWeight = val => {
    const { history } = this.props;
    const { valMult, workout } = this.state;
    history.push(`${START_WORKOUT}/${workout.name}/${val * valMult}`);
  };

  render() {
    const { history } = this.props;
    const { valMult, workout } = this.state;
    const values = Array.from(Array(200).keys());

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
              onClick={() => history.push(START_WORKOUT)}
            >
              <ArrowBack />
            </BackButton>
            <Box width={1}>
              <Typography variant="h6" color="inherit">
                {workout.name}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Page p={1}>
          <Grid container justify="center" alignItems="stretch" spacing={1}>
            {values.map(v => (
              <Grid key={v} item xs={6}>
                <Value elevation={2} onClick={() => this.onSelectWeight(v + 1)}>
                  <Box
                    p={2}
                    textAlign="center"
                    fontFamily="Monospace"
                    fontWeight="fontWeightMedium"
                  >
                    <Box fontSize={48} component="span">
                      {(v + 1) * valMult}
                    </Box>
                    <Box pl={1} fontSize={22} component="span">
                      lbs
                    </Box>
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
            onClick={() => this.onSelectWeight(0)}
          >
            Skip
          </BottomAction>
        </BottomActions>
      </>
    );
  }
}

export default SelectWeightPage;
