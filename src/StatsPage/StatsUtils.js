import moment from 'moment';

export const calcSetMap = sets => {
  const setMap = {};
  sets.forEach(set => {
    const list = setMap[set.workout.name] || [];
    list.push(set);
    setMap[set.workout.name] = list;
  });
  return setMap;
};

export const getTotalWeight = sets => {
  return sets.reduce(
    (sum, set) => sum + Number.parseInt(set.weight, 0) || 0,
    0
  );
};

export const getTotalReps = sets => {
  return sets.reduce((sum, set) => sum + set.value, 0);
};

export const getStartWorkoutTime = sets => {
  let firstSet;
  sets.forEach(set => {
    if (!firstSet || firstSet.created > set.created) {
      firstSet = set;
    }
  });
  return firstSet.created;
};

export const getLastCompletedSetTime = sets => {
  let mostRecentSet;
  sets.forEach(set => {
    if (!mostRecentSet || mostRecentSet.created < set.created) {
      mostRecentSet = set;
    }
  });
  return mostRecentSet.created;
};

export const getFavoriteWorkoutStats = (sets, workouts) => {
  const setMap = calcSetMap(sets);
  let favWorkout = {};

  workouts
    .filter(workout => setMap[workout.name])
    .forEach(workout => {
      if (
        setMap[workout.name].length > (setMap[favWorkout.name] || []).length
      ) {
        favWorkout = workout;
      }
    });
  const prSet = setMap[favWorkout.name].reduce(
    (max, set) => (max.weight > set.weight ? max : set),
    { weight: 0 }
  );
  console.log(prSet);
  return {
    name: favWorkout.name,
    totalWeight: setMap[favWorkout.name].reduce(
      (sum, set) => sum + Number.parseInt(set.weight, 10),
      0
    ),
    pr: prSet.weight,
    prTime: prSet.created,
    totalSets: setMap[favWorkout.name].length,
    totalReps: setMap[favWorkout.name].reduce((sum, set) => sum + set.value, 0)
  };
};

export const getWeekdayStats = sets => {
  const weekdaySetsMap = {};

  sets.forEach(set => {
    const day = moment(set.created).format('dddd');
    weekdaySetsMap[day] = (weekdaySetsMap[day] || 0) + 1;
  });

  const labels = Object.keys(weekdaySetsMap);
  const sortedDays = labels.sort(
    (a, b) => weekdaySetsMap[b] - weekdaySetsMap[a]
  );

  return {
    favWeekday: sortedDays[0],
    leastFavWeekday: sortedDays[sortedDays.length - 1],
    labels,
    chartData: labels.map(day => weekdaySetsMap[day])
  };
};
