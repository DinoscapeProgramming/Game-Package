#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

if (!process.argv.slice(2) || process.argv.slice(2).length === 0) return console.log({ action: "unregisterGame", err: "No options were given" });
try {
  fs.unlinkSync(path.dirname(__dirname) + "/games/" + process.argv.slice(2)[0]);
} catch (err) {
  return console.log({ action: "unregisterGame", err: err.message });
}
return console.log({ action: "unregisterGame", path: process.argv.slice(2)[0], gamePath: path.dirname(__dirname) + "/games/" + process.argv.slice(2)[0] });