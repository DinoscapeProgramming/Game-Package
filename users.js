const fs = require('fs');
const config = require('./config.js');
const matches = require('./matches.js');

function createUser(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "createUser", err: "No options were given" });
    if (!Object.keys(options).includes("username") || !options.username) return resolve({ action: "createUser", err: "No username was given" });
    if ((extraOptions?.usernameCharacterLimit) && (options.username.length > extraOptions.usernameCharacterLimit)) return resolve({ action: "createUser", err: "Username is too long" });
    if (!userId) return resolve({ action: "createUser", err: "No user id was given" });
    fs.writeFile(require("./config.js").options.file, JSON.stringify({
      users: {
        ...config.readFileSync().data.users,
        ...{
          [userId]: {
            username: options.username,
            avatar: options.avatar || null,
            wins: {}
          }
        }
      },
      matches: config.readFileSync().data.matches
    }), 'utf8', function(err) {
      if (err) return resolve({ action: "createUser", err: err.message });
      return resolve({ action: "createUser", userId, username: options.username, avatar: options.avatar || null });
    });
  });
}

function createUserSync(userId, options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "createUserSync", err: "No options were given" };
  if (!Object.keys(options).includes("username") || !options.username) return { action: "createUserSync", err: "No username was given" };
  if ((extraOptions?.usernameCharacterLimit) && (options.username.length > extraOptions.usernameCharacterLimit)) return { action: "createUserSync", err: "Username is too long" };
  if (!userId) return { action: "createUserSync", err: "No user id was given" };
  try {
    fs.writeFileSync(require("./config.js").options.file, JSON.stringify({
      users: {
        ...config.readFileSync().data.users,
        ...{
          [userId]: {
            username: options.username,
            avatar: options.avatar || null,
            wins: {}
          }
        }
      },
      matches: config.readFileSync().data.matches
    }), 'utf8');
  } catch (err) {
    return { action: "createUserSync", err: err.message };
  }
  return { action: "createUserSync", userId, username: options.username, avatar: options.avatar || null };
}

function editUser(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "editUser", err: "No options were given" });
    if (!Object.keys(options).includes("options") || !options.options) return resolve({ action: "editUser", err: "No new options was given" });
    if (!userId) return resolve({ action: "editUser", err: "No user id was given" });
    if (!Object.keys(config.readFileSync().data.users).includes(userId)) return resolve({ action: "editUser", err: "Invalid user id" });
    if (options?.options?.avatar && !isURLSync({ url: options?.options?.avatar })) return resolve({ action: "editUser", err: "Avatar is not a valid url" });
    if (options?.options?.username && ((extraOptions?.usernameCharacterLimit) && (options?.options?.username?.length > extraOptions.usernameCharacterLimit))) return resolve({ action: "editUser", err: "Username is too long" });
    fs.writeFile(require("./config.js").options.file, JSON.stringify({
      users: {
        ...config.readFileSync().data.users,
        ...{
          [userId]: {
            username: options?.options?.username || config.readFileSync().data.users[userId].username,
            avatar: options?.options?.avatar || config.readFileSync().data.users[userId]?.avatar || null,
            wins: options?.options?.wins || config.readFileSync().data.users[userId].wins
          }
        }
      },
      matches: config.readFileSync().data.matches
    }), 'utf8', function(err) {
      if (err) return resolve({ action: "editUser", err: err.message });
      return resolve({ action: "editUser", userId, options: options.options });
    });
  });
}

function editUserSync(userId, options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "editUserSync", err: "No options were given" };
  if (!Object.keys(options).includes("options") || !options.options) return { action: "editUserSync", err: "No new options was given" };
  if (!userId) return { action: "editUserSync", err: "No user id was given" };
  if (!Object.keys(config.readFileSync().data.users).includes(userId)) return { action: "editUserSync", err: "Invalid user id" };
  if (options?.options?.avatar && !isURLSync({ url: options?.options?.avatar })) return { action: "editUserSync", err: "Avatar is not a valid url" };
  if (options?.options?.username && ((extraOptions?.usernameCharacterLimit) && (options?.options?.username?.length > extraOptions.usernameCharacterLimit))) return { action: "editUserSync", err: "Username is too long" };
  try {
    fs.writeFileSync(require("./config.js").options.file, JSON.stringify({
      users: {
        ...config.readFileSync().data.users,
        ...{
          [userId]: {
            username: options?.options?.username || config.readFileSync().data.users[userId].username,
            avatar: options?.options?.avatar || config.readFileSync().data.users[userId]?.avatar || null,
            wins: options?.options?.wins || config.readFileSync().data.users[userId].wins
          }
        }
      },
      matches: config.readFileSync().data.matches
    }), 'utf8');
  } catch (err) {
    return { action: "editUserSync", err: err.message };
  }
  return { action: "editUserSync", userId, options: options.options };
}

function deleteUser(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!userId) return resolve({ action: "deleteUser", err: "No user id was given" });
    if (!Object.keys(config.readFileSync().data.users).includes(userId)) return resolve({ action: "deleteUser", err: "Invalid user id" });
    var username = config.readFileSync().data.users[userId].username;
    var userMatches = Object.entries(config.readFileSync().data.matches).filter((match) => match[1].players.includes(userId));
    userMatches.forEach((match) => {
      matches.rejectMatchSync(userId, { matchId: match[0] });
    });
    fs.writeFile(require("./config.js").options.file, JSON.stringify({ users: Object.entries(config.readFileSync().data.users).filter((user) => user[0] !== userId).reduce((data, item) => ({ ...data, [item[0]]: item[1] }), {}), matches: config.readFileSync().data.matches }), 'utf8', function(err) {
      if (err) return resolve({ action: "deleteUser", err: err.message });
      return resolve({ action: "deleteUser", userId, username, matches: userMatches });
    });
  });
}

function deleteUserSync(userId, options, extraOptions) {
  if (!userId) return { action: "deleteUserSync", err: "No user id was given" };
  if (!Object.keys(config.readFileSync().data.users).includes(userId)) return { action: "deleteUserSync", err: "Invalid user id" };
  var username = config.readFileSync().data.users[userId].username;
  var userMatches = Object.entries(config.readFileSync().data.matches).filter((match) => match[1].players.includes(userId));
  userMatches.forEach((match) => {
    matches.rejectMatchSync(userId, { matchId: match[0] });
  });
  try {
    fs.writeFileSync(require("./config.js").options.file, JSON.stringify({ users: Object.entries(config.readFileSync().data.users).filter((user) => user[0] !== userId).reduce((data, item) => ({ ...data, [item[0]]: item[1] }), {}), matches: config.readFileSync().data.matches }), 'utf8');
  } catch (err) {
    return { action: "deleteUserSync", err: err.message };
  }
  return { action: "deleteUserSync", userId, username, matches: userMatches };
}

function getUser(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!userId) return resolve({ action: "getUser", err: "No user id was given" });
    if (!Object.keys(config.readFileSync().data.users).includes(userId)) return resolve({ action: "getUser", err: "Invalid user id" });
    return resolve({ action: "getUser", userId, username: config.readFileSync().data.users[userId].username, avatar: config.readFileSync().data.users?.[userId].avatar || null, wins: config.readFileSync().data.users?.[userId].wins || {} });
  });
}

function getUserSync(userId, options, extraOptions) {
  if (!userId) return { action: "getUserSync", err: "No user id was given" };
  if (!Object.keys(config.readFileSync().data.users).includes(userId)) return { action: "getUserSync", err: "Invalid user id" };
  return { action: "getUserSync", userId, username: config.readFileSync().data.users[userId].username, avatar: config.readFileSync().data.users?.[userId].avatar || null, wins: config.readFileSync().data.users?.[userId].wins || {} };
}

function allUsers(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    return resolve({ action: "allUsers", users: config.readFileSync().data.users });
  });
}

function allUsersSync(userId, options, extraOptions) {
  return { action: "allUsersSync", users: config.readFileSync().data.users };
}

module.exports = {
  createUser,
  editUser,
  deleteUser,
  getUser,
  allUsers,
  createUserSync,
  editUserSync,
  deleteUserSync,
  getUserSync,
  allUsersSync
}