const fs = require('fs');

module.exports = {
  config: require('./src/config.js'),
  users: require('./src/users.js'),
  matches: require('./src/matches.js'),
  leaderboard: require('./src/leaderboard.js'),
  gameRegistry: require('./src/gameRegistry.js'),
  util: require('./src/util.js'),
  engine: require('./src/engine.js'),
  games: fs.readdirSync(__dirname + '/src/games').reduce((data, item) => ({ ...data, [item.substring(0, item.length - 3)]: require("./src/games/" + item) }), {}),
  templates: fs.readdirSync(__dirname + '/src/templates').reduce((data, item) => ({ ...data, [item.substring(0, item.length - 3)]: require("./src/templates/" + item) }), {}),
  defaultOptions: require('./src/defaultOptions.json')
}
