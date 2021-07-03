const numberOfUniverse = 4,
  numberOfPortals = 4;
const portals = [
  [1, 2, 3],
  [1, 3, 2],
  [2, 4, 2],
  [3, 4, 3]
];


const deamonsTime = [[0], [1, 4], [2, 2, 3], [0]];

const calculateWaitTime = ({ universe, currentTime }) => {
  let waitTime = 0;
  let tempTime = currentTime;
  const deamonPetronTimes = deamonsTime[universe - 1].slice(1);
  for (let i = 0; i < deamonPetronTimes.length; i++) {
    const timeInstance = deamonPetronTimes[i];
    if (timeInstance > tempTime) {
      return waitTime;
    }
    if (tempTime === timeInstance) {
      waitTime++;
      tempTime++;
    }
  }

  return waitTime;
};

const findAllPossibleUniverseLinked = ({ universe, currentTime }) => {
  const applicablePortals = portals.filter((portal) =>
    portal.slice(0, 2).includes(universe)
  );

  return applicablePortals.map((portal) => {
    const toUniverse = portal[0] === universe ? portal[1] : portal[0];
    const travelTime = portal[2];
    const waitTime = calculateWaitTime({
      universe: toUniverse,
      currentTime: currentTime + travelTime,
    });

    return {
      universe: toUniverse,
      updatedTotalTime: travelTime + waitTime + currentTime,
    };
  });
};

let shortestTime = null;

const tryToFindVaccine = ({ visistedUniverses, timeSpent }) => {
  const [currentUniverse] = visistedUniverses.slice(-1);
  findAllPossibleUniverseLinked({
    universe: currentUniverse,
    currentTime: timeSpent,
  }).forEach(({ universe, updatedTotalTime }) => {
    // console.log([...visistedUniverses, universe],updatedTotalTime)
    if (
      (shortestTime !== null && shortestTime < updatedTotalTime) ||
      visistedUniverses.includes(universe)
    ) {
      return;
    }

    if (universe === numberOfUniverse) {
      shortestTime = updatedTotalTime;
      return;
    }

    tryToFindVaccine({
      visistedUniverses: [...visistedUniverses, universe],
      timeSpent: updatedTotalTime,
    });
  });
};

tryToFindVaccine({ visistedUniverses: [1], timeSpent: 0 });

console.log(shortestTime);