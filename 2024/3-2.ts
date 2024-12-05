import fs from "node:fs";
import readline from "node:readline";

const input = "3.in";
let data = 0;
let enable = true;

for await (const line of readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  terminal: false,
})) {
  const result = line.match(/(do\(\))|(don't\(\))|(mul\(\d+,\d+\))/g)!;
  for(const item of result) {
    if (item.includes("mul") && enable) {
      const [a, b] = item.match(/\d+/g)!.map(x => parseInt(x));
      data += a * b;
    }

    if (item.includes("do()")) {
      enable = true;
    }

    if (item.includes("don't()")) {
      enable = false;
    }
  }
}


console.log(data);