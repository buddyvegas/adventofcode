import fs from "node:fs";
import readline from "node:readline";

const input = "3.in";
let data = 0;

for await (const line of readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  terminal: false,
})) {
  const result = line.match(/(mul\(\d+,\d+\))/g)!
    .map(mul => mul.match(/\d+/g)!
    .map(x => parseInt(x)))
    .reduce((acc, [a, b]) => acc + (a * b), 0);

  data += result;
}


console.log(data);