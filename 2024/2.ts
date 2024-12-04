import fs from "node:fs";
import readline from "node:readline";

const input = "2.in";
const data: number[][] = [];

for await (const line of readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  terminal: false,
})) {
  data.push(line.split(" ").map(x => parseInt(x)));
}

const safeIncrease = data.reduce((count, report) => {
  const isSafe = report.slice(1).every((value, index) => {
    const diff = value - report[index];
    return diff > 0 && diff <= 3;
  });
  return count + (isSafe ? 1 : 0);
}, 0);

const safeDecrease = data.reduce((count, report) => {
  const isSafe = report.slice(1).every((value, index) => {
    const diff = value - report[index];
    return diff < 0 && diff >= -3;
  });
  return count + (isSafe ? 1 : 0);
}, 0);

console.log(safeIncrease + safeDecrease);