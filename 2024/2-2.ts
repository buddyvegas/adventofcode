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

const isSafeIncreate = (report: number[]) => {
  return report.slice(1).every((value, index) => {
    const diff = value - report[index];
    return diff > 0 && diff <= 3;
  });
}

const isSafeDecrease = (report: number[]) => {
  return report.slice(1).every((value, index) => {
    const diff = value - report[index];
    return diff < 0 && diff >= -3;
  });
}

const isSafe = data.reduce((count, report) => {
  const isSafe = isSafeIncreate(report) || isSafeDecrease(report);
  if (isSafe) {
    return count + 1;
  }

  const indexesToIgnore = report.map((value, index) => index);
  for(const indexToIgnore of indexesToIgnore) {
    const newReport = report.filter((_, index) => index !== indexToIgnore);
    if (isSafeIncreate(newReport) || isSafeDecrease(newReport)) {
      return count + 1;
    }
  }

  return count;
}, 0);


console.log(isSafe);