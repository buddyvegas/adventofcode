import fs from 'node:fs';
import readline from 'node:readline';

const input = '4.in';
const data: string[][] = [];
const search = ['X', 'M', 'A', 'S'];

function searchAround(x: number, y: number) {
  let found = 0;

  if (data[x][y] === 'X') {
    for (let sx = -1; sx <= 1; sx++) {
      if (x + sx < 0 || x + sx >= data.length) continue;

      for (let sy = -1; sy <= 1; sy++) {
        if (y + sy < 0 || y + sy >= data[x].length) continue;
        if (sx === 0 && sy === 0) continue;

        if (data[x + sx][y + sy] === 'M') {
          if (x + sx + sx < 0 || x + sx + sx >= data.length) continue;

          if (data[x + sx + sx][y + sy + sy] === 'A') {
            if (x + sx + sx + sx < 0 || x + sx + sx + sx >= data.length) continue;

            if (data[x + sx + sx + sx][y + sy + sy + sy] === 'S') {
              found += 1;
            }
          }
        }
      }
    }
  }

  return found;
}

for await (const line of readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  terminal: false,
})) {
  data.push([...line.split('')]);
}

let result = 0;

for (var x = 0; x < data.length; x++) {
  for (var y = 0; y < data[x].length; y++) {
    result += searchAround(x, y);
  }
}

console.log(result);
