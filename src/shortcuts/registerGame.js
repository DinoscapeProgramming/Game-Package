#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const gameRegistry = require('../gameRegistry.js');
const defaultOptions = require('../defaultOptions.json');

if (!process.argv.slice(2) || process.argv.slice(2).length === 0) return console.log({ action: "registerGame", err: "No options were given" });
try {
  if ((process.argv.slice(2)[0] === "url") || (process.argv.slice(2)[1] === "plugin")) {
    gameRegistry.fetchURL({ type: (process.argv.slice(2)[0] === "url") ? "text" : "json", url: (process.argv.slice(2)[0] === "url") ? process.argv.slice(2)[1] : ((require('../config.js').options?.pluginURL || defaultOptions.pluginURL) + "?pluginId=" + process.argv.slice(2)[1]) }).then((result) => {
      fs.writeFileSync(path.dirname(__dirname) + "/games/" + ((process.argv.slice(2)[0] === "url") ? path.basename(process.argv.slice(2)[1]) : ((process.argv.slice(2)[0] === "plugin") ? (result.data.name.toLowerCase() + ".js") : "Invalid")), (process.argv.slice(2)[0] === "url") ? result.data : ((process.argv.slice(2)[0] === "plugin") ? result.data.code : "Invalid"), "utf8");
      return console.log({ action: "registerGame", type: process.argv.slice(2)[0], game: process.argv.slice(2)[1], path: path.dirname(__dirname) + "/games/" + ((process.argv.slice(2)[0] === "url") ? path.basename(process.argv.slice(2)[1]) : ((process.argv.slice(2)[0] === "plugin") ? (result.data.name.toLowerCase() + ".js") : "Invalid")) });
    });
  } else if (process.argv.slice(2)[0] === "file") {
    fs.writeFileSync(path.dirname(__dirname) + "/games/" + path.basename(process.argv.slice(2)[1]), fs.readFileSync(process.argv.slice(2)[1], "utf8"), "utf8");
    return console.log({ action: "registerGame", type: process.argv.slice(2)[0], game: process.argv.slice(2)[1], path: path.dirname(__dirname) + "/games/" + process.argv.slice(2)[1] });
  } else {
    return console.log({ action: "registerGame", err: "Invalid type" });
  }
} catch (err) {
  return console.log({ action: "registerGame", err: err.message });
}
