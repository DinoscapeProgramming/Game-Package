#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

if (!process.argv.slice(2) || process.argv.slice(2).length === 0) return console.log({ action: "registerGame", err: "No options were given" });
try {
  fs.writeFileSync(path.dirname(__dirname) + "/games/" + process.argv.slice(2)[0], fs.readFileSync(process.argv.slice(2)[0], "utf8"), "utf8");
} catch (err) {
  return console.log({ action: "registerGame", err: err.message });
}
return console.log({ action: "registerGame", path: process.argv.slice(2)[0], gamePath: path.dirname(__dirname) + "/games/" + process.argv.slice(2)[0] });