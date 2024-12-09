import fs from 'node:fs';
import readline from 'node:readline';

const input = '6.in';

type Direction = [0, -1] | [1, 0] | [0, 1] | [-1, 0];
type Position = number[];
type Map = string[][];

const CRATE = '#';
const GUARD = '^';
const DIRECTION: Record<string, Direction> = {
  UP: [0, -1],
  RIGHT: [1, 0],
  DOWN: [0, 1],
  LEFT: [-1, 0],
};

let world: Map = [];

for await (const line of readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  terminal: false,
})) {
  world = [...world, [...line.split('')]];
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

let currentDirection = DIRECTION.UP;
let currentPosition = getInitialPosition()!;
let distinctPositions: Position[] = [currentPosition];

while (isInBound(currentPosition)) {
  [currentPosition, currentDirection] = step(currentPosition, currentDirection);
  if (!isPassAlready(distinctPositions, currentPosition) && isInBound(currentPosition)) {
    distinctPositions = [...distinctPositions, currentPosition];
  }
}

// for (let row of world) {
//   console.log(row.join(''));
// }

console.log({ result: distinctPositions.length });
