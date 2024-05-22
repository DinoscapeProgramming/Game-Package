const fs = require('fs');
const path = require('path');
const defaultOptions = require('./defaultOptions.json');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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

function registerGames(options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "registerGames", err: "No options were given" });
    if (!Object.keys(options).includes("games") || !options.games) return resolve({ action: "registerGames", err: "No games were given" });
    var games = [];
    try {
      options.games.forEach((game, index) => {
        if ((game.type === "url") || (game.type === "plugin")) {
          fetchURL({ type: (game.type === "url") ? "text" : "json", url: (game.type === "url") ? game.game : ((require('./config.js').options?.pluginURL || defaultOptions.pluginURL) + "?pluginId=" + game.game) }).then((result) => {
            games.push({
              ...{
                path: __dirname + "/games/" +  ((game.type === "url") ? path.basename(game.game) : ((game.type === "plugin") ? (result.data.name.toLowerCase() + ".js") : "Invalid"))
              },
              ...game
            });
            fs.writeFile(__dirname + "/games/" +  ((game.type === "url") ? path.basename(game.game) : ((game.type === "plugin") ? (result.data.name.toLowerCase() + ".js") : "Invalid")), (game.type === "url") ? result.data : ((game.type === "plugin") ? result.data.code : "Invalid"), "utf8", (err) => {
              if (err) return resolve({ action: "registerGames", err: err.message });
              if (options.games.length + (index + 1)) return resolve({ action: "registerGames", games });
            });
          });
        } else if (game.type === "file") {
          games.push({
            ...{
              path: __dirname + "/games/" + path.basename(game.game)
            },
            ...game
          });
          fs.writeFile(__dirname + "/games/" + path.basename(game.game), fs.readFileSync(game.game, "utf8"), "utf8", (err) => {
            if (err) return resolve({ action: "registerGames", err: err.message });
            if (options.games.length + (index + 1)) return resolve({ action: "registerGames", games });
          });
        } else {
          return resolve({ action: "registerGames", err: "Invalid type" });
        }
      });
    } catch (err) {
      return resolve({ action: "registerGames", err: err.message });
    }
  });
}
  
function registerGamesSync(options) {
  if (!options || Object.keys(options).length === 0) return { action: "registerGamesSync", err: "No options were given" };
  if (!Object.keys(options).includes("games") || !options.games) return { action: "registerGamesSync", err: "No games were given" };
  var games = [];
  try {
    options.games.forEach((game, index) => {
      if ((game.type === "url") || (game.type === "plugin")) {
        fetchURL({ type: (game.type === "url") ? "text" : "json", url: (game.type === "url") ? game.game : ((require('./config.js').options?.pluginURL || defaultOptions.pluginURL) + "?pluginId=" + game.game) }).then((result) => {
          games.push({
            ...{
              path: __dirname + "/games/" +  ((game.type === "url") ? path.basename(game.game) : ((game.type === "plugin") ? (result.data.name.toLowerCase() + ".js") : "Invalid"))
            },
            ...game
          });
          fs.writeFileSync(__dirname + "/games/" +  ((game.type === "url") ? path.basename(game.game) : ((game.type === "plugin") ? (result.data.name.toLowerCase() + ".js") : "Invalid")), (game.type === "url") ? result.data : ((game.type === "plugin") ? result.data.code : "Invalid"), "utf8");
          if (options.games.length === (index + 1)) return { action: "registerGamesSync", games };
        });
      } else if (game.type === "file") {
        games.push({
          ...{
            path: __dirname + "/games/" + path.basename(game.game)
          },
          ...game
        });
        fs.writeFileSync(__dirname + "/games/" + path.basename(game.game), fs.readFileSync(game.game, "utf8"), "utf8");
        if (options.games.length === (index + 1)) return { action: "registerGamesSync", games };
      }  else {
        return { action: "registerGamesSync", err: "Invalid type" };
      }
    });
  } catch (err) {
    return { action: "registerGamesSync", err: err.message };
  }
}
  
function unregisterGames(options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "unregisterGames", err: "No options were given" });
    if (!Object.keys(options).includes("games") || !options.games) return resolve({ action: "unregisterGames", err: "No games were given" });
    var games = [];
    try {
      options.games.forEach((game, index) => {
        if (game.type === "plugin") {
          fetchURL({ type: (game.type === "url") ? "text" : "json", url: (require('./config.js').options?.pluginURL || defaultOptions.pluginURL + "?pluginId=" + game.game) }).then((result) => {
            games.push({
              ...{
                path: __dirname + "/games/" +  ((game.type === "plugin") ? (result.data.name.substring() + ".js") : "Invalid")
              },
              ...game
            });
            fs.unlink(__dirname + "/games/" + ((game.type === "plugin") ? (result.data.name.substring() + ".js") : "Invalid"), (err) => {
              if (err) return resolve({ action: "unregisterGames", err: err.message });
              if (options.games.length === (index + 1)) return resolve({ action: "unregisterGames", games });
            });
          });
        } else if ((game.type === "url") || (game.type === "file")) {
          games.push({
            ...{
              path: __dirname + "/games/" + path.basename(game.game)
            },
            ...game
          });
          fs.unlink(__dirname + "/games/" + path.basename(game.game), (err) => {
            if (err) return resolve({ action: "unregisterGames", err: err.message });
            if (options.games.length === (index + 1)) return resolve({ action: "unregisterGames", games });
          });
        } else {
          return resolve({ action: "unregisterGames", err: "Invalid type" });
        }
      });
    } catch (err) {
      return resolve({ action: "unregisterGames", err: err.message });
    }
    return resolve({ action: "unregisterGames", games: options.games.map((item, index) => ({ ...item, ...{ path: paths[index] } })) });
  });
}
  
function unregisterGamesSync(options) {
  if (!options || Object.keys(options).length === 0) return { action: "unregisterGamesSync", err: "No options were given" };
  if (!Object.keys(options).includes("games") || !options.games) return { action: "unregisterGamesSync", err: "No games were given" };
  var games = [];
  try {
    options.games.forEach((game, index) => {
      if (game.type === "plugin") {
        fetchURL({ type: (game.type === "url") ? "text" : "json", url: (require('./config.json').options?.pluginURL || defaultOptions.pluginURL + "?pluginId=" + game.game) }).then((result) => {
          games.push({
            ...{
              path: __dirname + "/games/" +  ((game.type === "plugin") ? (result.data.name.substring() + ".js") : "Invalid")
            },
            ...game
          });
          fs.unlinkSync(__dirname + "/games/" + ((game.type === "plugin") ? (result.data.name.substring() + ".js") : "Invalid"));
          if (options.games.length === (index + 1)) return { action: "unregisterGamesSync", games };
        });
      } else if ((game.type === "url") || (game.type === "file")) {
        games.push({
          ...{
            path: __dirname + "/games/" + path.basename(game.game)
          },
          ...game
        });
        fs.unlinkSync(__dirname + "/games/" + path.basename(game.game));
        if (options.games.length === (index + 1)) return { action: "unregisterGamesSync", games };
      } else {
        return { action: "unregisterGames", err: "Invalid type" };
      }
    });
  } catch (err) {
    return { action: "unregisterGamesSync", err: err.message };
  }
  return { action: "unregisterGamesSync", games: options.games.map((item, index) => ({ ...item, ...{ path: paths[index] } })) };
}

module.exports = {
  isURL,
  fetchURL,
  options,
  registerGames,
  unregisterGames,
  isURLSync,
  fetchURLSync,
  optionsSync,
  registerGamesSync,
  unregisterGamesSync
}
