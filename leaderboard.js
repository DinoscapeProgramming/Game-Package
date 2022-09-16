const fs = require('fs');
const config = require('./config.js');

function ranking(options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "ranking", err: "No options were given" });
    return resolve({
      action: "ranking",
      users: Object.entries(config.readFileSync().data.users).map((user) => ({ username: user[0], wins: user[1].wins })).sort((user) => (options.sort) ? user.wins[options.sort] : (Object.entries(user.wins).reduce((data, item) => (Number(data) || 0) + Number(item))))
    });
  });
}

function rankingSync(options) {
  if (!options || Object.keys(options).length === 0) return { action: "rankingSync", err: "No options were given" };
  return {
    action: "rankingSync",
    users: Object.entries(config.readFileSync().data.users).map((user) => ({ username: user[0], wins: user[1].wins })).sort((user) => (options.sort) ? user.wins[options.sort] : (Object.entries(user.wins).reduce((data, item) => (Number(data) || 0) + Number(item))))
  };
}

module.exports = {
  ranking,
  rankingSync
}