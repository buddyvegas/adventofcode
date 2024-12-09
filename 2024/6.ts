import fs from 'node:fs';
import readline from 'node:readline';

const input = '6.sample.in';

type Direction = [0, -1] | [1, 0] | [0, 1] | [-1, 0];
type Position = number[];
type Map = string[][];

const CRATE = '#';
const EMPTY = '.';
const GUARD = '^';
const DIRECTION: Record<string, Direction> = {
  UP: [0, -1],
  RIGHT: [1, 0],
  DOWN: [0, 1],
  LEFT: [-1, 0],
};

let currentDirection = DIRECTION.UP;
let world: Map = [];
let result = 0;

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

let position = getInitialPosition()!;

function getMapSlot(position: Position) {
  const [x, y] = position;
  return world[y][x];
}

function setMapSlot(map: Map, slot: string, position: Position) {
  const [x, y] = position;
  map[y][x] = slot;
}

function getStepPosition(direction: Direction, position: Position) {
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

function step(direction: Direction): [Map, Position, Direction] {
  const initialPosition = [...position];
  const newMap = [...world];
  const newPosition = getStepPosition(direction, position);
  const newSlot = getMapSlot(newPosition);
  let newDirection: Direction = direction;

  switch (newSlot) {
    case CRATE:
      newDirection = getNewDirection(currentDirection);
      break;
    default:
      setMapSlot(newMap, GUARD, newPosition);
      setMapSlot(newMap, EMPTY, initialPosition);
  }

  return [newMap, newPosition, newDirection];
}

function save(data: [Map, Position, Direction]) {
  const [newWorld, newPosition, newDirection] = data;
  world = [...newWorld];
  position = newPosition;
  currentDirection = newDirection;
}

function showWorld() {
  for (let row of world) {
    console.log(row.join(''));
  }
  console.log('-------------');
}

console.log(world[0].length);
console.log(world.length);

while (position[0] > 0 && position[1] > 0 && position[0] < world[0].length && position[1] < world.length) {
  console.log(position);
  let stepData = step(currentDirection);
  save(stepData);
}

// showWorld();

// save(step(currentDirection));

// showWorld();

// console.log({ initialPosition: position });

console.log({ result });

// const test = [1, 2];
// const test2 = [
//   [1, 2],
//   [3, 4],
// ];

// console.log(test2.some((x) => x[0] === test[0] && x[1] === test[1]));
