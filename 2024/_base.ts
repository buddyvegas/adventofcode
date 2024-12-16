import fs from 'node:fs';
import readline from 'node:readline';

const input = 'x.in';
const data: string[] = [];

for await (const line of readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  terminal: false,
})) {
  data.push(line);
  // read line
}

console.log({ data });
