const fs = require('fs');
const path = require('path');
const util = require('../util.js');
const config = require('../config.js');
const users = require('../users.js');
const matches = require('../matches.js');

function winner(options, extraOptions) {
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

function winnerSync(options, extraOptions) {
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
      ...{
        players: {
          [userId]: 1,
          [options.playerId]: 2
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
        turn: Math.floor(Math.random() * 2) + 1,
        rounds: Array(extraOptions?.rounds || 1).fill(0)
      },
      ...extraOptions?.data || {}
    }
  });
}
  
function createMatchSync(userId, options, extraOptions) {
  return matches.createMatchSync(userId, options, {
    data: {
      ...{
        players: {
          [userId]: 1,
          [options.playerId]: 2
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
        turn: Math.floor(Math.random() * 2) + 1,
        rounds: Array(extraOptions?.rounds || 1).fill(0)
      },
      ...extraOptions?.data || {}
    }
  });
}

function placeField(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "placeField", err: "No options were given" });
    if (!userId) return resolve({ action: "placeField", err: "No user id was given" });
    if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return resolve({ action: "placeField", err: "Invalid user id" });
    if (!Object.keys(options).includes("matchId") || !options.matchId) return resolve({ action: "placeField", err: "No match id was given" });
    if (!Object.keys(config.readDatabaseSync().data.matches).includes(options.matchId)) return resolve({ action: "placeField", err: "Invalid match id" });
    if (!config.readDatabaseSync().data.matches[options.matchId].players.includes(userId)) return resolve({ action: "placeField", err: "You are not in this match" });
    if (config.readDatabaseSync().data.matches[options.matchId].data.players[userId] !== config.readDatabaseSync().data.matches[options.matchId].data.turn) return resolve({ action: "placeField", err: "It is not your turn" });
    if (!Object.keys(options).includes("field") || !options.field) return resolve({ action: "placeField", err: "No field was given" });
    if ((options.field < 1) || (options.field > ((config.readDatabaseSync().data.matches[options.matchId].match.data.game.length)))) return resolve({ action: "placeField", err: "Invalid field" });
    if ((config.readDatabaseSync().data.matches[options.matchId].match.data.game[Number(options.field - 1)])[config.readDatabaseSync().data.matches[options.matchId].match.data.game[Number(options.field - 1)].length - 1]) return resolve({ action: "placeField", err: "This row is already full" });
    var match = config.readDatabaseSync().data.matches[options.matchId];
    winner({ game: match.data.game.map((item, index) => [...((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]) }).then((result) => {
      if ((result.winner === 0) || (match.data.rounds.reverse[1] === 0)) {
        fs.writeFile(require("../config.js").options.file, JSON.stringify({
          users: config.readDatabaseSync().data.users,
          matches: {
            ...config.readDatabaseSync().data.matches,
            ...{
              [options.matchId]: {
                ...match,
                ...{
                  data: {
                    ...match.data,
                    ...{
                      game: (result.winner === 0) ? match.data.game.map((item, index) => [...((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]) : [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                      turn: (result.winner === 0) ? ((match.data.turn === 1) ? 2 : 1) : Math.floor(Math.random() * 2) + 1,
                      rounds: (result.winner === 0) ? match.data.rounds : match.data.rounds.map((_, index) => (index === match.data.rounds.indexOf(0)) ? match.data.players[userId] : 0)
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
            players: match.data.players,
            field: options.field,
            roundWinner: result.winner,
            winner: 0,
            turn: (result.winner === 0) ? ((match.data.turn === 1) ? 2 : 1) : Math.floor(Math.random() * 2) + 1,
            game: (result.winner === 0) ? match.data.game.map((item, index) => [...((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]) : [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            rounds: (result.winner === 0) ? match.data.rounds : match.data-rounds.map((_, index) => (index === match.data.rounds.indexOf(0)) ? match.data.players[userId] : 0)
          });
        });
      } else {
        util.getQuantityOfEachItem({ array: (result.winner === 0) ? match.data.rounds : match.data.rounds.map((_, index) => (index === match.data.rounds.indexOf(0)) ? match.data.players[userId] : 0) }).then((winner) => {
          if (winner[1] !== winner[2]) {
            users.editUser((winner[1] > winner[2]) ? 1 : ((winner[2] > winner[1]) ? 2 : 0), {
              wins: {
                ...users.getUserSync((winner[1] > winner[2]) ? 1 : ((winner[2] > winner[1]) ? 2 : 0)).wins,
                ...{
                  [path.basename(__filename).substring(0, path.basename(__filename).length - 3)]: users.getUserSync((winner[1] > winner[2]) ? 1 : ((winner[2] > winner[1]) ? 2 : 0)).wins[path.basename(__filename).substring(0, path.basename(__filename).length - 3)] || 0
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
                  roundWinner: result.winner,
                  winner: (winner[1] > winner[2]) ? 1 : ((winner[2] > winner[1]) ? 2 : 0),
                  turn: (result.winner === 0) ? ((match.data.turn === 1) ? 2 : 1) : Math.floor(Math.random() * 2) + 1,
                  game: (result.winner === 0) ? match.data.game.map((item, index) => [...((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]) : [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                  rounds: (result.winner === 0) ? match.data.rounds : match.data.rounds.map((_, index) => (index === match.data.rounds.indexOf(0)) ? match.data.players[userId] : 0)
                });
              });
            });
          } else {
            return resolve({
              action: "placeField",
              userId,
              matchId: options.matchId,
              players: match.data.players,
              field: options.field,
              roundWinner: result.winner,
              winner: (winner[1] > winner[2]) ? 1 : ((winner[2] > winner[1]) ? 2 : 0),
              turn: (result.winner === 0) ? ((match.data.turn === 1) ? 2 : 1) : Math.floor(Math.random() * 2) + 1,
              game: (result.winner === 0) ? match.data.game.map((item, index) => [...((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]) : [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
              rounds: (result.winner === 0) ? match.data.rounds : match.data.rounds.map((_, index) => (index === match.data.rounds.indexOf(0)) ? match.data.players[userId] : 0)
            });
          }
        });
      }
    });
  });
}

function placeFieldSync(userId, options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "placeFieldSync", err: "No options were given" };
  if (!userId) return { action: "placeFieldSync", err: "No user id was given" };
  if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return { action: "placeFieldSync", err: "Invalid user id" };
  if (!Object.keys(options).includes("matchId") || !options.matchId) return { action: "placeFieldSync", err: "No match id was given" };
  if (!Object.keys(config.readDatabaseSync().data.matches).includes(options.matchId)) return { action: "placeFieldSync", err: "Invalid match id" };
  if (!config.readDatabaseSync().data.matches[options.matchId].players.includes(userId)) return { action: "placeFieldSync", err: "You are not in this match" };
  if (config.readDatabaseSync().data.matches[options.matchId].data.players[userId] !== config.readDatabaseSync().data.matches[options.matchId].data.turn) return { action: "placeFieldSync", err: "It is not your turn" };
  if (!Object.keys(options).includes("field") || !options.field) return { action: "placeFieldSync", err: "No field was given" };
  if ((options.field < 1) || (options.field > ((config.readDatabaseSync().data.matches[options.matchId].match.data.game.length)))) return { action: "placeFieldSync", err: "Invalid field" };
    if ((config.readDatabaseSync().data.matches[options.matchId].match.data.game[Number(options.field - 1)])[config.readDatabaseSync().data.matches[options.matchId].match.data.game[Number(options.field - 1)].length - 1]) return { action: "placeFieldSync", err: "This row is already full" };
  var match = config.readDatabaseSync().data.matches[options.matchId];
  try {
    if (winnerSync({ game: match.data.game.map((item, index) => [...((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]) }).winner === 0) {
      fs.writeFileSync(require("../config.js").options.file, JSON.stringify({
        users: config.readDatabaseSync().data.users,
        matches: {
          ...config.readDatabaseSync().data.matches,
          ...{
            [options.matchId]: {
              ...match,
              ...{
                data: {
                  ...match.data,
                  ...{
                    game: match.data.game.map((item, index) => [...((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]),
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
    winner: ({ game: match.data.game.map((item, index) => [...((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)]) }).winner,
    turn: (match.data.turn === 1) ? 2 : 1,
    game: match.data.game.map((item, index) => [...((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.data.players[userId]]] : item.filter((character) => character !== 0)), ...Array(6 - ((index === Number(options.field - 1)) ? [...item.filter((character) => character !== 0), ...[match.players[userId]]] : item.filter((character) => character !== 0)).length).fill(0)])
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
