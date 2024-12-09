import fs from 'node:fs';
import readline from 'node:readline';

const input = '4.in';
const data: string[][] = [];

function searchXShape(x: number, y: number) {
  let found = 0;

  if (data[x][y] === 'A') {
    if (data[x - 1][y - 1] === 'M' && data[x + 1][y + 1] === 'S') {
      found += 1;
    }

    if (data[x - 1][y - 1] === 'S' && data[x + 1][y + 1] === 'M') {
      found += 1;
    }

    if (data[x - 1][y + 1] === 'M' && data[x + 1][y - 1] === 'S') {
      found += 1;
    }

    if (data[x - 1][y + 1] === 'S' && data[x + 1][y - 1] === 'M') {
      found += 1;
    }
  }

  if (found == 2) {
    return 1;
  }

  return 0;
}

for await (const line of readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  terminal: false,
})) {
  data.push([...line.split('')]);
}

let result = 0;

for (var x = 1; x < data.length - 1; x++) {
  for (var y = 1; y < data[x].length - 1; y++) {
    result += searchXShape(x, y);
  }
}

console.log(result);
