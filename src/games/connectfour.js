const fs = require('fs');
const config = require('../config.js');
const users = require('../users.js');
const matches = require('../matches.js');

function winner(options) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "winner", err: "Invalid options" });
    if (!Object.keys(options).includes("game") || !options.game) return resolve({ action: "winner", err: "No game was given" });
    return resolve({
      action: "winner",
      winner: (
        JSON.stringify(options.game).includes("1,1,1,1") || JSON.stringify(
          (
            [
              [
                options.game[0][0],
                options.game[1][0],
                options.game[2][0],
                options.game[3][0],
                options.game[4][0],
                options.game[5][0],
                options.game[6][0]
              ],
              [
                options.game[0][1],
                options.game[1][1],
                options.game[2][1],
                options.game[3][1],
                options.game[4][1],
                options.game[5][1],
                options.game[6][1]
              ],
              [
                options.game[0][2],
                options.game[1][2],
                options.game[2][2],
                options.game[3][2],
                options.game[4][2],
                options.game[5][2],
                options.game[6][2]
              ],
              [
                options.game[0][3],
                options.game[1][3],
                options.game[2][3],
                options.game[3][3],
                options.game[4][3],
                options.game[5][3],
                options.game[6][3]
              ],
              [
                options.game[0][4],
                options.game[1][4],
                options.game[2][4],
                options.game[3][4],
                options.game[4][4],
                options.game[5][4],
                options.game[6][4]
              ],
              [
                options.game[0][5],
                options.game[1][5],
                options.game[2][5],
                options.game[3][5],
                options.game[4][5],
                options.game[5][5],
                options.game[6][5]
              ]
            ]
          )
        ).includes("1,1,1,1") || (
          JSON.stringify(
            (
              [
                [
                  options.game[0][3],
                  options.game[1][2],
                  options.game[2][1],
                  options.game[3][0]
                ],
                [
                  options.game[0][4],
                  options.game[1][3],
                  options.game[2][2],
                  options.game[3][1],
                  options.game[4][0]
                ],
                [
                  options.game[0][5],
                  options.game[1][4],
                  options.game[2][3],
                  options.game[3][2],
                  options.game[4][1],
                  options.game[5][0]
                ],
                [
                  options.game[1][5],
                  options.game[2][4],
                  options.game[3][3],
                  options.game[4][2],
                  options.game[5][1],
                  options.game[6][0],
                ],
                [
                  options.game[2][5],
                  options.game[3][4],
                  options.game[4][3],
                  options.game[5][2],
                  options.game[6][1]
                ],
                [
                  options.game[3][5],
                  options.game[4][4],
                  options.game[5][3],
                  options.game[6][2]
                ]
              ]
            )
          ).includes("1,1,1,1") || JSON.stringify(
            (
              [
                [
                  options.game[3][5],
                  options.game[2][4],
                  options.game[1][3],
                  options.game[0][2]
                ],
                [
                  options.game[4][5],
                  options.game[3][4],
                  options.game[2][3],
                  options.game[1][2],
                  options.game[0][1]
                ],
                [
                  options.game[5][5],
                  options.game[4][4],
                  options.game[3][3],
                  options.game[2][2],
                  options.game[1][1],
                  options.game[0][0]
                ],
                [
                  options.game[6][5],
                  options.game[5][4],
                  options.game[4][3],
                  options.game[3][2],
                  options.game[2][1],
                  options.game[1][0],
                ],
                [
                  options.game[6][4],
                  options.game[5][3],
                  options.game[4][2],
                  options.game[3][1],
                  options.game[2][0]
                ],
                [
                  options.game[6][3],
                  options.game[5][2],
                  options.game[4][1],
                  options.game[3][0]
                ]
              ]
            )
          ).includes("1,1,1,1")
        )
      ) ? 1 : (
        (
          JSON.stringify(options.game).includes("2,2,2,2") || JSON.stringify(
            (
              [
                [
                  options.game[0][0],
                  options.game[1][0],
                  options.game[2][0],
                  options.game[3][0],
                  options.game[4][0],
                  options.game[5][0],
                  options.game[6][0]
                ],
                [
                  options.game[0][1],
                  options.game[1][1],
                  options.game[2][1],
                  options.game[3][1],
                  options.game[4][1],
                  options.game[5][1],
                  options.game[6][1]
                ],
                [
                  options.game[0][2],
                  options.game[1][2],
                  options.game[2][2],
                  options.game[3][2],
                  options.game[4][2],
                  options.game[5][2],
                  options.game[6][2]
                ],
                [
                  options.game[0][3],
                  options.game[1][3],
                  options.game[2][3],
                  options.game[3][3],
                  options.game[4][3],
                  options.game[5][3],
                  options.game[6][3]
                ],
                [
                  options.game[0][4],
                  options.game[1][4],
                  options.game[2][4],
                  options.game[3][4],
                  options.game[4][4],
                  options.game[5][4],
                  options.game[6][4]
                ],
                [
                  options.game[0][5],
                  options.game[1][5],
                  options.game[2][5],
                  options.game[3][5],
                  options.game[4][5],
                  options.game[5][5],
                  options.game[6][5]
                ]
              ]
            )
          ).includes("2,2,2,2") || (
            JSON.stringify(
              (
                [
                  [
                    options.game[0][3],
                    options.game[1][2],
                    options.game[2][1],
                    options.game[3][0]
                  ],
                  [
                    options.game[0][4],
                    options.game[1][3],
                    options.game[2][2],
                    options.game[3][1],
                    options.game[4][0]
                  ],
                  [
                    options.game[0][5],
                    options.game[1][4],
                    options.game[2][3],
                    options.game[3][2],
                    options.game[4][1],
                    options.game[5][0]
                  ],
                  [
                    options.game[1][5],
                    options.game[2][4],
                    options.game[3][3],
                    options.game[4][2],
                    options.game[5][1],
                    options.game[6][0],
                  ],
                  [
                    options.game[2][5],
                    options.game[3][4],
                    options.game[4][3],
                    options.game[5][2],
                    options.game[6][1]
                  ],
                  [
                    options.game[3][5],
                    options.game[4][4],
                    options.game[5][3],
                    options.game[6][2]
                  ]
                ]
              )
            ).includes("2,2,2,2") || JSON.stringify(
              (
                [
                  [
                    options.game[3][5],
                    options.game[2][4],
                    options.game[1][3],
                    options.game[0][2]
                  ],
                  [
                    options.game[4][5],
                    options.game[3][4],
                    options.game[2][3],
                    options.game[1][2],
                    options.game[0][1]
                  ],
                  [
                    options.game[5][5],
                    options.game[4][4],
                    options.game[3][3],
                    options.game[2][2],
                    options.game[1][1],
                    options.game[0][0]
                  ],
                  [
                    options.game[6][5],
                    options.game[5][4],
                    options.game[4][3],
                    options.game[3][2],
                    options.game[2][1],
                    options.game[1][0],
                  ],
                  [
                    options.game[6][4],
                    options.game[5][3],
                    options.game[4][2],
                    options.game[3][1],
                    options.game[2][0]
                  ],
                  [
                    options.game[6][3],
                    options.game[5][2],
                    options.game[4][1],
                    options.game[3][0]
                  ]
                ]
              )
            ).includes("2,2,2,2")
          )
        ) ? 2 : 0
      )
    });
  });
}

function winnerSync(options) {
  if (!options || Object.keys(options).length === 0) return { action: "winnerSync", err: "Invalid options" };
  if (!Object.keys(options).includes("game") || !options.game) return { action: "winnerSync", err: "No game was given" };
  return {
    action: "winnerSync",
    winner: (
      JSON.stringify(options.game).includes("1,1,1,1") || JSON.stringify(
        (
          [
            [
              options.game[0][0],
              options.game[1][0],
              options.game[2][0],
              options.game[3][0],
              options.game[4][0],
              options.game[5][0],
              options.game[6][0]
            ],
            [
              options.game[0][1],
              options.game[1][1],
              options.game[2][1],
              options.game[3][1],
              options.game[4][1],
              options.game[5][1],
              options.game[6][1]
            ],
            [
              options.game[0][2],
              options.game[1][2],
              options.game[2][2],
              options.game[3][2],
              options.game[4][2],
              options.game[5][2],
              options.game[6][2]
            ],
            [
              options.game[0][3],
              options.game[1][3],
              options.game[2][3],
              options.game[3][3],
              options.game[4][3],
              options.game[5][3],
              options.game[6][3]
            ],
            [
              options.game[0][4],
              options.game[1][4],
              options.game[2][4],
              options.game[3][4],
              options.game[4][4],
              options.game[5][4],
              options.game[6][4]
            ],
            [
              options.game[0][5],
              options.game[1][5],
              options.game[2][5],
              options.game[3][5],
              options.game[4][5],
              options.game[5][5],
              options.game[6][5]
            ]
          ]
        )
      ).includes("1,1,1,1") || (
        JSON.stringify(
          (
            [
              [
                options.game[0][3],
                options.game[1][2],
                options.game[2][1],
                options.game[3][0]
              ],
              [
                options.game[0][4],
                options.game[1][3],
                options.game[2][2],
                options.game[3][1],
                options.game[4][0]
              ],
              [
                options.game[0][5],
                options.game[1][4],
                options.game[2][3],
                options.game[3][2],
                options.game[4][1],
                options.game[5][0]
              ],
              [
                options.game[1][5],
                options.game[2][4],
                options.game[3][3],
                options.game[4][2],
                options.game[5][1],
                options.game[6][0],
              ],
              [
                options.game[2][5],
                options.game[3][4],
                options.game[4][3],
                options.game[5][2],
                options.game[6][1]
              ],
              [
                options.game[3][5],
                options.game[4][4],
                options.game[5][3],
                options.game[6][2]
              ]
            ]
          )
        ).includes("1,1,1,1") || JSON.stringify(
          (
            [
              [
                options.game[3][5],
                options.game[2][4],
                options.game[1][3],
                options.game[0][2]
              ],
              [
                options.game[4][5],
                options.game[3][4],
                options.game[2][3],
                options.game[1][2],
                options.game[0][1]
              ],
              [
                options.game[5][5],
                options.game[4][4],
                options.game[3][3],
                options.game[2][2],
                options.game[1][1],
                options.game[0][0]
              ],
              [
                options.game[6][5],
                options.game[5][4],
                options.game[4][3],
                options.game[3][2],
                options.game[2][1],
                options.game[1][0],
              ],
              [
                options.game[6][4],
                options.game[5][3],
                options.game[4][2],
                options.game[3][1],
                options.game[2][0]
              ],
              [
                options.game[6][3],
                options.game[5][2],
                options.game[4][1],
                options.game[3][0]
              ]
            ]
          )
        ).includes("1,1,1,1")
      )
    ) ? 1 : (
      (
        JSON.stringify(options.game).includes("2,2,2,2") || JSON.stringify(
          (
            [
              [
                options.game[0][0],
                options.game[1][0],
                options.game[2][0],
                options.game[3][0],
                options.game[4][0],
                options.game[5][0],
                options.game[6][0]
              ],
              [
                options.game[0][1],
                options.game[1][1],
                options.game[2][1],
                options.game[3][1],
                options.game[4][1],
                options.game[5][1],
                options.game[6][1]
              ],
              [
                options.game[0][2],
                options.game[1][2],
                options.game[2][2],
                options.game[3][2],
                options.game[4][2],
                options.game[5][2],
                options.game[6][2]
              ],
              [
                options.game[0][3],
                options.game[1][3],
                options.game[2][3],
                options.game[3][3],
                options.game[4][3],
                options.game[5][3],
                options.game[6][3]
              ],
              [
                options.game[0][4],
                options.game[1][4],
                options.game[2][4],
                options.game[3][4],
                options.game[4][4],
                options.game[5][4],
                options.game[6][4]
              ],
              [
                options.game[0][5],
                options.game[1][5],
                options.game[2][5],
                options.game[3][5],
                options.game[4][5],
                options.game[5][5],
                options.game[6][5]
              ]
            ]
          )
        ).includes("2,2,2,2") || (
          JSON.stringify(
            (
              [
                [
                  options.game[0][3],
                  options.game[1][2],
                  options.game[2][1],
                  options.game[3][0]
                ],
                [
                  options.game[0][4],
                  options.game[1][3],
                  options.game[2][2],
                  options.game[3][1],
                  options.game[4][0]
                ],
                [
                  options.game[0][5],
                  options.game[1][4],
                  options.game[2][3],
                  options.game[3][2],
                  options.game[4][1],
                  options.game[5][0]
                ],
                [
                  options.game[1][5],
                  options.game[2][4],
                  options.game[3][3],
                  options.game[4][2],
                  options.game[5][1],
                  options.game[6][0],
                ],
                [
                  options.game[2][5],
                  options.game[3][4],
                  options.game[4][3],
                  options.game[5][2],
                  options.game[6][1]
                ],
                [
                  options.game[3][5],
                  options.game[4][4],
                  options.game[5][3],
                  options.game[6][2]
                ]
              ]
            )
          ).includes("2,2,2,2") || JSON.stringify(
            (
              [
                [
                  options.game[3][5],
                  options.game[2][4],
                  options.game[1][3],
                  options.game[0][2]
                ],
                [
                  options.game[4][5],
                  options.game[3][4],
                  options.game[2][3],
                  options.game[1][2],
                  options.game[0][1]
                ],
                [
                  options.game[5][5],
                  options.game[4][4],
                  options.game[3][3],
                  options.game[2][2],
                  options.game[1][1],
                  options.game[0][0]
                ],
                [
                  options.game[6][5],
                  options.game[5][4],
                  options.game[4][3],
                  options.game[3][2],
                  options.game[2][1],
                  options.game[1][0],
                ],
                [
                  options.game[6][4],
                  options.game[5][3],
                  options.game[4][2],
                  options.game[3][1],
                  options.game[2][0]
                ],
                [
                  options.game[6][3],
                  options.game[5][2],
                  options.game[4][1],
                  options.game[3][0]
                ]
              ]
            )
          ).includes("2,2,2,2")
        )
      ) ? 2 : 0
    )
  };
}

function createMatch(userId, options, extraOptions) {
  return matches.createMatch(userId, options, {
    data: {
      players: {
        [userId]: role,
        [options.playerId]: (role === 1) ? 2 : 1
      },
      game: [
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ]
      ],
      turn: Math.floor(Math.random() * 2) + 1
    }
  });
}
  
function createMatchSync(userId, options, extraOptions) {
  return matches.createMatchSync(userId, options, {
    data: {
      players: {
        [userId]: role,
        [options.playerId]: (role === 1) ? 2 : 1
      },
      game: [
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ],
        [
          0, 0, 0, 0, 0, 0
        ]
      ],
      turn: Math.floor(Math.random() * 2) + 1
    }
  });
}

function placeField(userId, options, extraOptions) {
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
    winner({ game: match.data.game.map((item, index) => [...((index === Number(options.field)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]) }).then((result) => {
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
                      game: match.data.game.map((item, index) => [...((index === Number(options.field)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]),
                      turn: (match.data.turn === 1) ? 2 : 1
                    }
                  }
                }
              }
            }
          }
        }), "utf8", (err) => {
          if (err) return resolve({ action: "placeField", err: err.message });
          return resolve({
            action: "placeField",
            userId,
            matchId: options.matchId,
            field: options.field
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
    if (winnerSync({ game: match.data.game.map((item, index) => [...((index === Number(options.field)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]) }).winner === 0) {
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
                    game: match.data.game.map((item, index) => [...((index === Number(options.field)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]),
                    turn: (match.data.turn === 1) ? 2 : 1
                  }
                }
              }
            }
          }
        }
      }), "utf8");
    } else {
      users.editUserSync(userId, {
        wins: {
          ...users.getUserSync(userId).wins,
          ...{
            [path.basename(__filename).substring(0, path.basename(__filename).length - 3)]: users.getUserSync(userId).wins[path.basename(__filename).substring(0, path.basename(__filename).length - 3)] || 0
          }
        }
      });
      matches.rejectMatchSync(userId, { matchId: options.matchId });
    }
  } catch (err) {
    return { action: "placeFieldSync", err: err.message };
  };
  return {
    action: "placeFieldSync",
    userId,
    matchId: options.matchId,
    players: match.data.players,
    field: options.field,
    winner: ({ game: match.data.game.map((item, index) => [...((index === Number(options.field)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]) }).winner,
    turn: (match.data.turn === 1) ? 2 : 1
  };
}

module.exports = {
  winner,
  createMatch,
  placeField,
  winnerSync,
  createMatchSync,
  placeFieldSync
}