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
  const items = ['+', '*', '|'];
  const combinaisons: string[] = [];

  function generate(currentCombination: string, depth: number) {
    if (depth === length) {
      combinaisons.push(currentCombination);
      return;
    }

    for (let i = 0; i < items.length; i++) {
      generate(currentCombination + items[i], depth + 1);
    }
  }

  generate('', 0);
  return combinaisons;
}

let result = BigInt(0);
let allCombinaisons: Record<number, string[]> = {};
for (let [expected, values] of Object.entries(data)) {
  const allCalcul: string[] = [];
  const combinaisons = getAllCombinaisons(values.length - 1);

  for (let combinaison of combinaisons) {
    let calcul = '';
    let currentIndex = 0;
    calcul = values[currentIndex].toString();

    for (let operator of combinaison) {
      currentIndex += 1;
      calcul += operator + values[currentIndex].toString();
    }

    allCalcul.push(calcul);
  }

  allCombinaisons[expected] = allCalcul;
}

function calculateCombinaison(calcul: string) {
  const combinaison = calcul.match(/\+|\*/g)?.join('') || [];
  const values: number[] = calcul.match(/\w+/g)!.map((x) => parseInt(x));

  let valueIndex = 1;
  let combinaisonResult = values[0];

  for (let operator of combinaison) {
    if (operator === '+') {
      combinaisonResult += values[valueIndex];
    } else {
      combinaisonResult *= values[valueIndex];
    }

    valueIndex += 1;
  }

  return combinaisonResult;
}

for (let [expected, combinaisons] of Object.entries(allCombinaisons)) {
  for (let combinaison of combinaisons) {
    const calculs = combinaison.split('|');

    const results: number[] = [];

    for (let calcul of calculs) {
      results.push(calculateCombinaison(calcul));
    }

    if (results.join('') === expected) {
      result += BigInt(parseInt(expected));
      break;
    }
  }
}

console.log({ result });
