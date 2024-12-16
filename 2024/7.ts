import fs from 'node:fs';
import readline from 'node:readline';

const input = '7.in';
const data: Record<string, number[]> = {};

for await (const line of readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  terminal: false,
})) {
  const [expected, values] = line.split(':');
  data[expected] = values
    .trim()
    .split(' ')
    .map((x) => parseInt(x));
}

function getAllCombinaisons(length: number) {
  const combinaisons: string[] = [];
  for (let i = 0; i < 1 << length; i++) {
    const binaryString = (i >>> 0).toString(2).padStart(length, '0');
    combinaisons.push(binaryString);
  }

  return combinaisons;
}

let result = 0;
for (let [expected, values] of Object.entries(data)) {
  const combinaisons = getAllCombinaisons(values.length - 1);

  for (let combinaison of combinaisons) {
    let valueIndex = 1;
    let combinaisonResult = values[0];

    for (let operator of combinaison) {
      if (parseInt(operator) === 0) {
        combinaisonResult += values[valueIndex];
      } else {
        combinaisonResult *= values[valueIndex];
      }

      valueIndex += 1;
    }

    if (parseInt(expected) === combinaisonResult) {
      result += combinaisonResult;
      break;
    }
  }
}

console.log({ result });
