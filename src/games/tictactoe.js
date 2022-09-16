const fs = require('fs');
const path = require('path');
const config = require('../config.js');
const users = require('../users.js');
const matches = require('../matches.js');

function convertToField(options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "convertToField", err: "No options were given" });
    if (!Object.keys(options).includes("value") || !options.value) return resolve({ action: "convertToField", err: "No value was given" });
    if ((Number(options.value) < 1) || (Number(options.value) > 9)) return resolve({ action: "convertToField", err: "Invalid value" });
    var field;
    try {
      field = ((Math.ceil(Number(options.value) / 3) - 1).toString()) + ((Math.abs(((((Math.ceil(Number(options.value) / 3)) * 3) - 3) - Number(options.value))) - 1).toString());
    } catch (err) {
      return resolve({ action: "convertToField", err: err.message });
    }
    return resolve({ action: "convertToField", value: options.value, field });
  });
}

function convertToFieldSync(options) {
  if (!options || Object.keys(options).length === 0) return { action: "convertToFieldSync", err: "No options were given" };
  if (!Object.keys(options).includes("value") || !options.value) return { action: "convertToFieldSync", err: "No value was given" };
  if ((Number(options.value) < 1) || (Number(options.value) > 9)) return { action: "convertToFieldSync", err: "Invalid value" };
  var field;
  try {
    field = ((Math.ceil(Number(options.value) / 3) - 1).toString()) + ((Math.abs(((((Math.ceil(Number(options.value) / 3)) * 3) - 3) - Number(options.value))) - 1).toString());
  } catch (err) {
    return { action: "convertToFieldSync", err: err.message };
  }
  return { action: "convertToFieldSync", value: options.value, field };
}

function winner(options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "winner", err: "Invalid options" });
    if (!Object.keys(options).includes("game") || !options.game) return resolve({ action: "winner", err: "No game was given" });
    if (!Array.isArray(options.game) || options.game.length !== 3) return resolve({ action: "winner", err: "Invalid game" });
    return resolve({
      action: "winner",
      winner: (
        JSON.stringify(options.game).includes("[1,1,1]") || JSON.stringify(
          (
            [
              [
                options.game[0][0],
                options.game[1][0],
                options.game[2][0]
              ],
              [
                options.game[0][1],
                options.game[1][1],
                options.game[2][1]
              ],
              [
                options.game[0][2],
                options.game[1][2],
                options.game[2][2]
              ]
            ]
          )
        ).includes("[1,1,1]") || (
          (
            (options.game[0][0] === 1) && (options.game[1][1] === 1) && (options.game[2][2] === 1)
          )
        ) || (
          (options.game[0][2] === 1) && (options.game[1][1] === 1) && (options.game[2][0] === 1)
        )
      ) ? 1 : (
        (
          JSON.stringify(options.game).includes("[2,2,2]") || JSON.stringify(
            (
              [
                [
                  options.game[0][0],
                  options.game[1][0],
                  options.game[2][0]
                ],
                [
                  options.game[0][1],
                  options.game[1][1],
                  options.game[2][1]
                ],
                [
                  options.game[0][2],
                  options.game[1][2],
                  options.game[2][2]
                ]
              ]
            )
          ).includes("[2,2,2]") || (
            (
              (options.game[0][0] === 2) && (options.game[1][1] === 2) && (options.game[2][2] === 2)
            ) || (
              (options.game[0][2] === 2) && (options.game[1][1] === 2) && (options.game[2][0] === 2)
            )
          )
        ) ? 2 : (
          (
            !options.game.map((line) => line.map((item) => item.toString()).join("")).join("").includes("0")
          ) ? 3 : 0
        )
      )
    });
  });
}

function winnerSync(options) {
  if (!options || Object.keys(options).length === 0) return { action: "winner", err: "Invalid options" };
  if (!Object.keys(options).includes("game") || !options.game) return { action: "winner", err: "No game was given" };
  if (!Array.isArray(options.game) || options.game.length !== 3) return { action: "winner", err: "Invalid game" };
  return {
    action: "winner",
    winner: (
      JSON.stringify(options.game).includes("[1,1,1]") || JSON.stringify(
        (
          [
            [
              options.game[0][0],
              options.game[1][0],
              options.game[2][0]
            ],
            [
              options.game[0][1],
              options.game[1][1],
              options.game[2][1]
            ],
            [
              options.game[0][2],
              options.game[1][2],
              options.game[2][2]
            ]
          ]
        )
      ).includes("[1,1,1]") || (
        (
          (options.game[0][0] === 1) && (options.game[1][1] === 1) && (options.game[2][2] === 1)
        )
      ) || (
        (options.game[0][2] === 1) && (options.game[1][1] === 1) && (options.game[2][0] === 1)
      )
    ) ? 1 : (
      (
        JSON.stringify(options.game).includes("[2,2,2]") || JSON.stringify(
          (
            [
              [
                options.game[0][0],
                options.game[1][0],
                options.game[2][0]
              ],
              [
                options.game[0][1],
                options.game[1][1],
                options.game[2][1]
              ],
              [
                options.game[0][2],
                options.game[1][2],
                options.game[2][2]
              ]
            ]
          )
        ).includes("[2,2,2]") || (
          (
            (options.game[0][0] === 2) && (options.game[1][1] === 2) && (options.game[2][2] === 2)
          ) || (
            (options.game[0][2] === 2) && (options.game[1][1] === 2) && (options.game[2][0] === 2)
          )
        )
      ) ? 2 : (
        (
          !options.game.map((line) => line.map((item) => item.toString()).join("")).join("").includes("0")
        ) ? 3 : 0
      )
    )
  };
}

function createMatch(userId, options, extraOptions) {
  var role = Math.floor(Math.random() * 2) + 1;
  return matches.createMatch(userId, options, {
    data: {
      players: {
        [userId]: role,
        [options.playerId]: (role === 1) ? 2 : 1
      },
      game: [
        [
          0, 0, 0
        ],
        [
          0, 0, 0
        ],
        [
          0, 0, 0
        ]
      ],
      turn: Math.floor(Math.random() * 2) + 1
    }
  });
}

function createMatchSync(userId, options, extraOptions) {
  var role = Math.floor(Math.random() * 2) + 1;
  return matches.createMatchSync(userId, options, {
    data: {
      players: {
        [userId]: role,
        [options.playerId]: (role === 1) ? 2 : 1
      },
      game: [
        [
          0, 0, 0
        ],
        [
          0, 0, 0
        ],
        [
          0, 0, 0
        ]
      ],
      turn: Math.floor(Math.random() * 2) + 1
    }
  });
}

function placeField(userId, options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "placeField", err: "No options were given" });
    if (!userId) return resolve({ action: "placeField", err: "No user id was given" });
    if (!Object.keys(config.readFileSync().data.users).includes(userId)) return resolve({ action: "placeField", err: "Invalid user id" });
    if (!Object.keys(options).includes("matchId") || !options.matchId) return resolve({ action: "placeField", err: "No match id was given" });
    if (!Object.keys(config.readFileSync().data.matches).includes(options.matchId)) return resolve({ action: "placeField", err: "Invalid match id" });
    if (!config.readFileSync().data.matches[options.matchId].players.includes(userId)) return resolve({ action: "placeField", err: "You are not in this match" });
    if (config.readFileSync().data.matches[options.matchId].data.players[userId] !== config.readFileSync().data.matches[options.matchId].data.turn) return resolve({ action: "placeField", err: "It is not your turn" });
    if (!Object.keys(options).includes("field") || !options.field) return resolve({ action: "placeField", err: "No field was given" });
    var match = config.readFileSync().data.matches[options.matchId];
    winner({ game: match.data.game.map((item, index) => (index === Number(convertToFieldSync({ value: options.field }).field[0])) ? item.map((argument, i) => ((i === Number(convertToFieldSync({ value: options.field }).field[1])) && argument === 0) ? config.readFileSync().data.matches[options.matchId].data.players[userId] : argument) : item) }).then((result) => {
      if (result.winner === 0) {
        fs.writeFile(require("../config.js").options.file, JSON.stringify({
          users: config.readFileSync().data.users,
          matches: {
            ...config.readFileSync().data.matches,
            ...{
              [options.matchId]: {
                ...match,
                ...{
                  data: {
                    ...match.data,
                    ...{
                      game: match.data.game.map((item, index) => (index === Number(convertToFieldSync({ value: options.field }).field[0])) ? item.map((argument, i) => ((i === Number(convertToFieldSync({ value: options.field }).field[1])) && argument === 0) ? config.readFileSync().data.matches[options.matchId].data.players[userId] : argument) : item),
                      turn: (match.data.turn === 1) ? 2 : 1
                    }
                  }
                }
              }
            }
          }
        }), 'utf8', (err) => {
          if (err) return resolve({ action: "placeField", err: err.message });
          return resolve({
            action: "placeField",
            userId,
            matchId: options.matchId,
            players: match.data.players,
            field: options.field,
            winner: result.winner,
            turn: (match.data.turn === 1) ? 2 : 1
          });
        });
      } else {
        users.editUser(userId, {
          wins: {
            ...users.getUserSync(userId).wins,
            ...{
              [path.basename(__filename).substring(0, path.basename(__filename).length - 3)]: users.getUserSync(userId).wins[path.basename(__filename).substring(0, path.basename(__filename).length - 3)] || 0
            }
          }
        }).then(() => {
          matches.rejectMatch(userId, { matchId: options.matchId }).then(() => {
            return resolve({
              action: "placeField",
              userId,
              matchId: options.matchId,
              players: match.data.players,
              field: options.field,
              winner: result.winner,
              turn: (match.data.turn === 1) ? 2 : 1
            });
          });
        });
      }
    });
  });
}

function placeFieldSync(userId, options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "placeFieldSync", err: "No options were given" };
  if (!userId) return { action: "placeFieldSync", err: "No user id was given" };
  if (!Object.keys(config.readFileSync().data.users).includes(userId)) return { action: "placeFieldSync", err: "Invalid user id" };
  if (!Object.keys(options).includes("matchId") || !options.matchId) return { action: "placeFieldSync", err: "No match id was given" };
  if (!Object.keys(config.readFileSync().data.matches).includes(options.matchId)) return { action: "placeFieldSync", err: "Invalid match id" };
  if (!config.readFileSync().data.matches[options.matchId].players.includes(userId)) return { action: "placeFieldSync", err: "You are not in this match" };
  if (config.readFileSync().data.matches[options.matchId].data.players[userId] !== config.readFileSync().data.matches[options.matchId].data.turn) return { action: "placeFieldSync", err: "It is not your turn" };
  if (!Object.keys(options).includes("field") || !options.field) return { action: "placeFieldSync", err: "No field was given" };
  var match = config.readFileSync().data.matches[options.matchId];
  try {
    if (winnerSync({ game: match.data.game.map((item, index) => (index === Number(convertToFieldSync({ value: options.field }).field[0])) ? item.map((argument, i) => ((i === Number(convertToFieldSync({ value: options.field }).field[1])) && argument === 0) ? config.readFileSync().data.matches[options.matchId].data.players[userId] : argument) : item) }).winner === 0) {
      fs.writeFileSync(require("../config.js").options.file, JSON.stringify({
        users: config.readFileSync().data.users,
        matches: {
          ...config.readFileSync().data.matches,
          ...{
            [options.matchId]: {
              ...match,
              ...{
                data: {
                  ...match.data,
                  ...{
                    game: match.data.game.map((item, index) => (index === Number(convertToFieldSync({ value: options.field }).field[0])) ? item.map((argument, i) => ((i === Number(convertToFieldSync({ value: options.field }).field[1])) && argument === 0) ? config.readFileSync().data.matches[options.matchId].data.players[userId] : argument) : item),
                    turn: (match.data.turn === 1) ? 2 : 1
                  }
                }
              }
            }
          }
        }
      }), 'utf8');
    } else {
      users.editUserSync(userId, {
        wins: {
          ...users.getUserSync(userId).wins,
          ...{
            [path.basename(__filename).substring(0, path.basename(__filename).length - 3)]: users.getUserSync(userId).wins[path.basename(__filename).substring(0, path.basename(__filename).length - 3)] || 0
          }
        }
      })
      matches.rejectMatchSync(userId, { matchId: options.matchId });
    }
  } catch (err) {
    return { action: "placeFieldSync", err: err.message };
  }
  return {
    action: "placeFieldSync",
    userId,
    matchId: options.matchId,
    players: match.data.players,
    field: options.field,
    winner: winnerSync({ game: match.data.game.map((item, index) => (index === Number(convertToFieldSync({ value: options.field }).field[0])) ? item.map((argument, i) => ((i === Number(convertToFieldSync({ value: options.field }).field[1])) && argument === 0) ? config.readFileSync().data.matches[options.matchId].data.players[userId] : argument) : item) }).winner,
    turn: (match.data.turn === 1) ? 2 : 1
  };
}

module.exports = {
  convertToField,
  winner,
  createMatch,
  placeField,
  convertToFieldSync,
  winnerSync,
  createMatchSync,
  placeFieldSync
}