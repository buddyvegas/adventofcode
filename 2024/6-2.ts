import fs from 'node:fs';
import readline from 'node:readline';

const input = '6.in';

type Direction = [0, -1] | [1, 0] | [0, 1] | [-1, 0];
type Position = number[];
type Map = string[][];

const CRATE = '#';
const GUARD = '^';
const EMPTY = '.';
const DIRECTION: Record<string, Direction> = {
  UP: [0, -1],
  RIGHT: [1, 0],
  DOWN: [0, 1],
  LEFT: [-1, 0],
};

let world: Map = [];
let initialWorld: Map = [];

for await (const line of readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  terminal: false,
})) {
  world = [...world, [...line.split('')]];
  initialWorld = [...initialWorld, [...line.split('')]];
}

function getInitialPosition() {
  for (let y of world.keys()) {
    for (let [x, slot] of world[y].entries()) {
      if (slot === GUARD) {
        return [x, y];
      }
    }
  }
}

function getSlot(position: Position) {
  const [x, y] = position;
  return world[y][x];
}

function goTo(direction: Direction, position: Position) {
  const [x, y] = position;
  return [x + direction[0], y + direction[1]];
}

function getNewDirection(direction: Direction) {
  if (direction[0] === DIRECTION.UP[0] && direction[1] === DIRECTION.UP[1]) {
    return DIRECTION.RIGHT;
  }

  if (direction[0] === DIRECTION.RIGHT[0] && direction[1] === DIRECTION.RIGHT[1]) {
    return DIRECTION.DOWN;
  }

  if (direction[0] === DIRECTION.DOWN[0] && direction[1] === DIRECTION.DOWN[1]) {
    return DIRECTION.LEFT;
  }

  return DIRECTION.UP;
}

function step(position: Position, direction: Direction): [Position, Direction] {
  const newPosition = goTo(direction, position);
  if (!isInBound(newPosition)) {
    return [newPosition, direction];
  }

  const newSlot = getSlot(newPosition);
  let newDirection: Direction = direction;

  if (newSlot === CRATE) {
    newDirection = getNewDirection(direction);
    return [position, newDirection];
  }

  return [newPosition, newDirection];
}

function isInBound(position: Position) {
  const [x, y] = position;
  return x >= 0 && x < world[0].length && y >= 0 && y < world.length;
}

function isPassAlready(positions: Position[], position: Position) {
  return positions.some((x) => x[0] === position[0] && x[1] === position[1]);
}

function initialPatrol(position: Position, direction: Direction) {
  let positions: Position[] = [position];

  while (isInBound(position)) {
    [position, direction] = step(position, direction);
    if (!isPassAlready(positions, position) && isInBound(position)) {
      positions = [...positions, position];
    }
  }

  return positions;
}

function isOnLoop(positionsWithDirections: [Position, Direction][], position: Position, direction: Direction) {
  const target = [position, direction];
  return positionsWithDirections.some(
    (pair) =>
      pair.length === target.length &&
      pair.every(
        (subArray, index) => subArray.length === target[index].length && subArray.every((value, subIndex) => value === target[index][subIndex]),
      ),
  );
}

function patrol(position: Position, direction: Direction) {
  let isLoop = false;
  let positionsWithDirections: [Position, Direction][] = [[position, direction]];

  while (isInBound(position)) {
    [position, direction] = step(position, direction);
    if (/*!isPassAlready(positions, position) &&*/ isInBound(position)) {
      if (isOnLoop(positionsWithDirections, position, direction)) {
        isLoop = true;
        break;
      }
      positionsWithDirections = [...positionsWithDirections, [position, direction]];
    }
  }

  return isLoop;
}

const initialDirection = DIRECTION.UP;
const initialPosition = getInitialPosition()!;
let result = 0;

// function addCrate(position: Position) {
//   let newWorld = [...world];
//   const [x, y] = position;

//   newWorld[y][x] = CRATE;

//   return newWorld;
// }

let distinctPositions: Position[] = [...initialPatrol(initialPosition, initialDirection)];
let previousCratePosition: Position = [];
let current = 0;

for (let newCratePosition of distinctPositions) {
  current++;

  console.log(`${current} / ${distinctPositions.length}`);

  world[newCratePosition[1]][newCratePosition[0]] = CRATE;

  const isLoop = patrol(initialPosition, initialDirection);
  if (isLoop) {
    world[newCratePosition[1]][newCratePosition[0]] = 'O';
    result += 1;
  }

  if (previousCratePosition.length > 0) {
    world[previousCratePosition[1]][previousCratePosition[0]] = EMPTY;
  }

  previousCratePosition = [...newCratePosition];
}

console.log({ result });
