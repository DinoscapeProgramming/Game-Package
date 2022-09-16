const fs = require('fs');

module.exports = {
  config: require('./src/config.js'),
  users: require('./src/users.js'),
  matches: require('./src/matches.js'),
  leaderboard: require('./src/leaderboard.js'),
  gameEngine: require('./src/gameEngine.js'),
  games: fs.readdirSync(__dirname + '/src/games').reduce((data, item) => ({ ...data, [item.substring(0, item.length - 3)]: require("./src/games/" + item) }), {})
}