import fs from 'node:fs';
import readline from 'node:readline';

const input = '5.in';
const orderRules: number[][] = [];
const pagesToProduce: number[][] = [];

for await (const line of readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  terminal: false,
})) {
  if (line.includes('|')) orderRules.push([...line.split('|').map((x) => parseInt(x))]);
  if (line.includes(',')) pagesToProduce.push([...line.split(',').map((x) => parseInt(x))]);
}

let pagesOrder: Record<number, number[]> = {};
pagesOrder = orderRules.reduce(
  (acc, value) => ({
    ...acc,
    [value[0]]: acc[value[0]] ? [...acc[value[0]], value[1]] : [value[1]],
  }),
  {},
);

let result = 0;

for (let pages of pagesToProduce) {
  let isOk = true;
  for (let [index, page] of pages.entries()) {
    const pagesToVerify = pages.slice(index + 1);

    if (!pagesOrder[page]) {
      if (index === pages.length - 1) {
        continue;
      }
      isOk = false;
      break;
    }

    if (!pagesToVerify.every((p) => pagesOrder[page].includes(p))) {
      isOk = false;
      break;
    }
  }

  if (isOk) {
    result += pages[Math.floor(pages.length / 2)];
  }
}

console.log(result);
