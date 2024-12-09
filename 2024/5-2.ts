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

function isOrdered(pages: number[]) {
  return pages.every((page, index) => {
    if (!pagesOrder[page] && index !== pages.length - 1) {
      return false;
    }

    return pages.slice(index + 1).every((p) => pagesOrder[page].includes(p));
  });
}

function orderPages(pages: number[]) {
  let pagesOccurence: Record<number, number> = {};

  for (let page of pages) {
    const occurence: number = pages.reduce((acc: number, value: number) => {
      return acc + (pagesOrder[page]?.includes(value) ? 1 : 0);
    }, 0);

    pagesOccurence[occurence] = page;
  }

  return Object.values(pagesOccurence).reverse();
}

for (let pages of pagesToProduce) {
  let isOk = isOrdered(pages);

  if (!isOk) {
    const orderedPages = orderPages(pages);
    result += orderedPages[Math.floor(pages.length / 2)];
  }
}

console.log('---', result, '---');
