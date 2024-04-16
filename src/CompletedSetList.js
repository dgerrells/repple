import React from 'react';
import { format as timeAgo } from 'timeago.js';
import { Swipeable } from 'react-swipeable';
import {
  Button,
  IconButton,
  ListItem,
  Avatar,
  List,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { styled } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { START_WORKOUT } from 'Routes';

const DateHeader = styled(ListSubheader)({
  backgroundColor: 'white'
});

const SetCount = styled(Avatar)({
  backgroundColor: '#B4A4A4'
});

class CompletedSetList extends React.Component {
  state = {
    setsList: [],
    pages: 2
  };

  static getDerivedStateFromProps(props, state) {
    const { completedSets } = props;
    const map = {};
    completedSets.forEach(set => {
      const date = new Date(set.created).toLocaleDateString('en-US');
      map[date] = [...(map[date] || []), set];
    });

    return {
      ...state,
      setsList: Object.keys(map)
        .sort((a, b) => new Date(a) - new Date(b))
        .reverse()
        .map(date => map[date].sort().reverse())
    };
  }

  addPages = () => {
    this.setState({
      pages: this.state.pages + 2
    });
  };

  parseLabel = set => {
    if (set.weight && set.weight > 0) {
      return `${set.workout.name} ${set.weight} lbs`;
    }
    return set.workout.name;
  };

  render() {
    const { setsList, pages } = this.state;
    const { history, deleteSet, completeSet } = this.props;

    const sets = setsList
      .filter((s, i) => i < pages)
      .map((sets, i) => {
        return (
          <List dense={true} key={i}>
            <DateHeader>
              {new Date(sets[0].created).toLocaleDateString('en-US')}
            </DateHeader>
            {sets.map(set => (
              <Swipeable
                key={set.created}
                onSwipedRight={() => deleteSet(set)}
                onSwipedLeft={() => deleteSet(set)}
              >
                <ListItem
                  button
                  onClick={() =>
                    history.push(`${START_WORKOUT}/${set.workout.name}`)
                  }
                >
                  <ListItemAvatar>
                    <SetCount>
                      <span>{set.value}</span>
                    </SetCount>
                  </ListItemAvatar>
                  <ListItemText
                    primary={this.parseLabel(set)}
                    secondary={timeAgo(set.created)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        completeSet(set.workout, set.weight, set.value)
                      }
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Swipeable>
            ))}
          </List>
        );
      });

    return (
      <>
        {sets}
        {pages < setsList.length && (
          <Box pt={2} justifyContent="center" display="flex">
            <Button
              color="secondary"
              variant="outlined"
              onClick={this.addPages}
            >
              Show Older
            </Button>
          </Box>
        )}
      </>
    );
  }
}

export default CompletedSetList;
