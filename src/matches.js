const fs = require('fs');
const crypto = require('crypto');
const util = require('./util.js')
const config = require('./config.js');
const users = require('./users.js');

function createMatch(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "createMatch", err: "No options were given" });
    if (!userId) return resolve({ action: "createMatch", err: "No user id was given" });
    if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return resolve({ action: "createMatch", err: "Invalid user id" });
    if (!Object.keys(options).includes("playerId") || !options.playerId) return resolve({ action: "createMatch", err: "No player id was given" });
    if (!Object.keys(config.readDatabaseSync().data.users).includes(options.playerId)) return resolve({ action: "createMatch", err: "Invalid player id" });
    var matchId = crypto.randomBytes(4).toString("hex");
    fs.writeFile(require("./config.js").options.file, JSON.stringify({
      users: config.readDatabaseSync().data.users,
      matches: {
        ...config.readDatabaseSync().data.matches,
        ...{
          [matchId]: {
            status: "pending",
            players: [userId, options.playerId],
            data: extraOptions.data || {}
          }
        }
      }
    }), 'utf8', (err) => {
      if (err) return resolve({ action: "createMatch", err: err.message });
      return resolve({ action: "createMatch", userId, playerId: options.playerId, matchId, username: config.readDatabaseSync().data.users[userId].username, playerName: config.readDatabaseSync().data.users[options.playerId].username });
    });
  });
}

function createMatchSync(userId, options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "createMatchSync", err: "No options were given" };
  if (!userId) return { action: "createMatchSync", err: "No user id was given" };
  if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return { action: "createMatchSync", err: "Invalid user id" };
  if (!Object.keys(options).includes("playerId") || !options.playerId) return { action: "createMatchSync", err: "No player id was given" };
  if (!Object.keys(config.readDatabaseSync().data.users).includes(options.playerId)) return { action: "createMatchSync", err: "Invalid player id" };
  var matchId = crypto.randomBytes(4).toString("hex");
  try {
    fs.writeFileSync(require("./config.js").options.file, JSON.stringify({
      users: config.readDatabaseSync().data.users,
      matches: {
        ...config.readDatabaseSync().data.matches,
        ...{
          [matchId]: {
            status: "pending",
            players: [userId, options.playerId],
            data: extraOptions.data || {}
          }
        }
      }
    }), 'utf8');
  } catch (err) {
    return { action: "createMatchSync", err: err.message };
  }
  return { action: "createMatchSync", userId, playerId: options.playerId, matchId, username: config.readDatabaseSync().data.users[userId].username, playerName: config.readDatabaseSync().data.users[options.playerId].username };
}

function acceptMatch(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "acceptMatch", err: "No options were given" });
    if (!userId) return resolve({ action: "acceptMatch", err: "No user id was given" });
    if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return resolve({ action: "acceptMatch", err: "Invalid user id" });
    if (!Object.keys(options).includes("matchId") || !options.matchId) return resolve({ action: "acceptMatch", err: "No match id was given" });
    if (!Object.keys(config.readDatabaseSync().data.matches).includes(options.matchId)) return resolve({ action: "acceptMatch", err: "Invalid match id" });
    if (!config.readDatabaseSync().data.matches[options.matchId].players.includes(userId)) return resolve({ action: "acceptMatch", err: "You are not in this match" });
    fs.writeFile(require("./config.js").options.file, JSON.stringify({
      users: config.readDatabaseSync().data.users,
      matches: {
        ...config.readDatabaseSync().data.matches,
        ...{
          [options.matchId]: {
            ...config.readDatabaseSync().data.matches[options.matchId],
            ...{
              status: "fulfilled"
            }
          }
        }
      }
    }), 'utf8', (err) => {
      if (err) return resolve({ action: "acceptMatch", err: err.message });
      return resolve({ action: "acceptMatch", userId, matchId: options.matchId });
    });
  });
}

function acceptMatchSync(userId, options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "acceptMatchSync", err: "No options were given" };
  if (!userId) return { action: "acceptMatchSync", err: "No user id was given" };
  if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return { action: "acceptMatchSync", err: "Invalid user id" };
  if (!Object.keys(options).includes("matchId") || !options.matchId) return { action: "acceptMatchSync", err: "No match id was given" };
  if (!Object.keys(config.readDatabaseSync().data.matches).includes(options.matchId)) return { action: "acceptMatchSync", err: "Invalid match id" };
  if (!config.readDatabaseSync().data.matches[options.matchId].players.includes(userId)) return { action: "acceptMatchSync", err: "You are not in this match" };
  try {
    fs.writeFileSync(require("./config.js").options.file, JSON.stringify({
      users: config.readDatabaseSync().data.users,
      matches: {
        ...config.readDatabaseSync().data.matches,
        ...{
          [options.matchId]: {
            ...config.readDatabaseSync().data.matches[options.matchId],
            ...{
              status: "fulfilled"
            }
          }
        }
      }
    }), 'utf8');
  } catch (err) {
    return { action: "acceptMatchSync", err: err.message };
  }
  return { action: "acceptMatchSync", userId, matchId: options.matchId };
}

function rejectMatch(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "rejectMatch", err: "No options were given" });
    if (!userId) return resolve({ action: "rejectMatch", err: "No user id was given" });
    if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return resolve({ action: "rejectMatch", err: "Invalid user id" });
    if (!Object.keys(options).includes("matchId") || !options.matchId) return resolve({ action: "rejectMatch", err: "No match id was given" });
    if (!Object.keys(config.readDatabaseSync().data.matches).includes(options.matchId)) return resolve({ action: "rejectMatch", err: "Invalid match id" });
    if (!config.readDatabaseSync().data.matches[options.matchId].players.includes(userId)) return resolve({ action: "rejectMatch", err: "You are not in this match" });
    fs.writeFile(require("./config.js").options.file, JSON.stringify({
      users: config.readDatabaseSync().data.users,
      matches: Object.entries(config.readDatabaseSync().data.matches).filter((item) => item[0] !== options.matchId).reduce((data, item) => ({ ...data, [item[0]]: item[1] }), {})
    }), 'utf8', (err) => {
      if (err) return resolve({ action: "rejectMatch", err: err.message });
      return resolve({ action: "rejectMatch", userId, matchId: options.matchId });
    });
  });
}

function rejectMatchSync(userId, options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "rejectMatchSync", err: "No options were given" };
  if (!userId) return { action: "rejectMatchSync", err: "No user id was given" };
  if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return { action: "rejectMatchSync", err: "Invalid user id" };
  if (!Object.keys(options).includes("matchId") || !options.matchId) return { action: "rejectMatchSync", err: "No match id was given" };
  if (!Object.keys(config.readDatabaseSync().data.matches).includes(options.matchId)) return { action: "rejectMatchSync", err: "Invalid match id" };
  if (!config.readDatabaseSync().data.matches[options.matchId].players.includes(userId)) return { action: "rejectMatchSync", err: "You are not in this match" };
  try {
    fs.writeFileSync(require("./config.js").options.file, JSON.stringify({
      users: config.readDatabaseSync().data.users,
      matches: Object.entries(config.readDatabaseSync().data.matches).filter((item) => item[0] !== options.matchId).reduce((data, item) => ({ ...data, [item[0]]: item[1] }), {})
    }), 'utf8');
  } catch (err) {
    return { action: "rejectMatchSync", err: err.message };
  }
  return { action: "rejectMatchSync", userId, matchId: options.matchId };
}

module.exports = {
  createMatch,
  acceptMatch,
  rejectMatch,
  createMatchSync,
  acceptMatchSync,
  rejectMatchSync
}
