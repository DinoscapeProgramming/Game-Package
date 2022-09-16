const fs = require('fs');
const path = require('path');
const config = require('./config.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const defaultOptions = {
  pluginURL: "https://socketgames.dinoscape.tk/plugins/code/",
  pluginNameURL: "https://socketgames.dinoscape.tk/api/v1/plugins/information/"
};

function isURL(options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "isURL", err: "No options were given" });
    if (!Object.keys(options).includes("url") || !options.url) return resolve({ action: "isURL", err: "No url was given" });
    try {
      new URL(options.url);
    } catch (err) {
      return resolve({ action: "isURL", valid: false });
    }
    return resolve({ action: "isURL", valid: true });
  });
}

function isURLSync(options) {
  if (!options || Object.keys(options).length === 0) return { action: "isURLSync", err: "No options were given" };
  if (!Object.keys(options).includes("url") || !options.url) return { action: "isURLSync", err: "No url was given" };
  try {
    new URL(options.url);
  } catch (err) {
    return { action: "isURLSync", valid: false };
  }
  return { action: "isURLSync", valid: true };
}

function fetchURL(options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "fetchURL", err: "No options were given" });
    if (!Object.keys(options).includes("url") || !options.url) return resolve({ action: "fetchURL", err: "No url was given" });
    if (!isURLSync({ url: options.url }).valid) return resolve({ action: "fetchURL", err: "Invalid url" });
    if (!Object.keys(options).includes("type") || !options.type) return resolve({ action: "fetchURL", err: "No type was given" });
    fetch(options.url)
    .then((res) => res[options.type]())
    .then((result) => {
      return resolve({ action: "fetchURL", data: result });
    });
  });
}

function fetchURLSync(options) {
  if (!options || Object.keys(options).length === 0) return { action: "fetchURLSync", err: "No options were given" };
  if (!Object.keys(options).includes("url") || !options.url) return { action: "fetchURLSync", err: "No url was given" };
  if (!isURLSync({ url: options.url }).valid) return { action: "fetchURLSync", err: "Invalid url" };
  if (!Object.keys(options).includes("type") || !options.type) return { action: "fetchURLSync", err: "No type was given" };
  fetch(options.url)
  .then((res) => res[options.type]())
  .then((result) => {
    return { action: "fetchURLSync", data: result };
  });
}

function options() {
  return { action: "options", options: require("./config.js").options };
}
  
function optionsSync() {
  return new Promise((resolve, reject) => {
    resolve({ action: "optionsSync", options: require("./config.js").options });
  });
}

function registerGame(options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "registerGame", err: "No options were given" });
    if ((!Object.keys(options).includes("path") || !options.path) && (!Object.keys(options).includes("url") || !options.url) && (!Object.keys(options).includes("plugin") || !options.plugin)) return resolve({ action: "registerGame", err: "No " + (!Object.keys(options).includes("path") || !options.path) ? "path" : ((!Object.keys(options).includes("url") || !options.url) ? "url" : ((!Object.keys(options).includes("plugin") || !options.plugin) ? "plugin" : "key")) + " was given" });
    fs.writeFile(__dirname + "/games/" + ((options.path) ? options.path : ((options.url) ? path.basename(options.url) : (fetchURLSync({ type: "json", url: defaultOptions.pluginNameURL + "?id=" + options.plugin }).data.pluginName))), (options.path) ? fs.readFileSync(options.path, "utf8") : ((options.url) ? fetchURLSync({ type: "text", url: options.url }).data : (fetchURLSync({ type: "text", url: (require("./config.js").options?.pluginURL || defaultOptions.pluginURL) + options.plugin }).data)), "utf8", (err) => {
      if (err) return resolve({ action: "registerGame", err: err.message });
      return resolve({ action: "registerGame", path: options.path, gamePath: __dirname + "/games/" + options.path });
    });
  });
}
  
function registerGameSync(options) {
  if (!options || Object.keys(options).length === 0) return { action: "registerGameSync", err: "No options were given" };
  if ((!Object.keys(options).includes("path") || !options.path) && (!Object.keys(options).includes("url") || !options.url) && (!Object.keys(options).includes("plugin") || !options.plugin)) return { action: "registerGameSync", err: "No " + (!Object.keys(options).includes("path") || !options.path) ? "path" : ((!Object.keys(options).includes("url") || !options.url) ? "url" : ((!Object.keys(options).includes("plugin") || !options.plugin) ? "plugin" : "key")) + " was given" };
  try {
    fs.writeFileSync(__dirname + "/games/" + ((options.path) ? options.path : ((options.url) ? path.basename(options.url) : (fetchURLSync({ type: "json", url: defaultOptions.pluginNameURL + "?id=" + options.plugin }).data.pluginName))), (options.path) ? fs.readFileSync(options.path, "utf8") : ((options.url) ? fetchURLSync({ type: "text", url: options.url }).data : (fetchURLSync({ type: "text", url: (require("./config.js").options?.pluginURL || defaultOptions.pluginURL) + options.plugin }).data)), "utf8");
  } catch (err) {
    return { action: "registerGameSync", err: err.message };
  }
  return { action: "registerGameSync", path: options.path, gamePath: __dirname + "/games/" + options.path };
}
  
function unregisterGame(options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "unregisterGame", err: "No options were given" });
    if ((!Object.keys(options).includes("path") || !options.path) && (!Object.keys(options).includes("url") || !options.url) && (!Object.keys(options).includes("plugin") || !options.plugin)) return resolve({ action: "unregisterGame", err: "No " + (!Object.keys(options).includes("path") || !options.path) ? "path" : ((!Object.keys(options).includes("url") || !options.url) ? "url" : ((!Object.keys(options).includes("plugin") || !options.plugin) ? "plugin" : "key")) + " was given" });
    fs.unlink(__dirname + "/games/" + ((options.path) ? options.path : ((options.url) ? path.basename(options.url) : (fetchURLSync({ type: "json", url: defaultOptions.pluginNameURL + "?id=" + options.plugin }).data.pluginName))), (err) => {
      if (err) return resolve({ action: "unregisterGame", err: err.message });
      return resolve({ action: "unregisterGame", path: options.path, gamePath: __dirname + "/games/" + options.path });
    });
  });
}
  
function unregisterGameSync(options) {
  if (!options || Object.keys(options).length === 0) return { action: "unregisterGameSync", err: "No options were given" };
  if ((!Object.keys(options).includes("path") || !options.path) && (!Object.keys(options).includes("url") || !options.url) && (!Object.keys(options).includes("plugin") || !options.plugin)) return { action: "unregisterGameSync", err: "No " + (!Object.keys(options).includes("path") || !options.path) ? "path" : ((!Object.keys(options).includes("url") || !options.url) ? "url" : ((!Object.keys(options).includes("plugin") || !options.plugin) ? "plugin" : "key")) + " was given" };
  try {
    fs.unlinkSync(__dirname + "/games/" + ((options.path) ? options.path : ((options.url) ? path.basename(options.url) : (fetchURLSync({ type: "json", url: defaultOptions.pluginNameURL + "?id=" + options.plugin }).data.pluginName))));
  } catch (err) {
    return { action: "unregisterGameSync", err: err.message };
  }
  return { action: "unregisterGameSync", path: options.path, gamePath: __dirname + "/games/" + options.path };
}

module.exports = {
  isURL,
  fetchURL,
  options,
  registerGame,
  unregisterGame,
  isURLSync,
  fetchURLSync,
  optionsSync,
  registerGameSync,
  unregisterGameSync
}