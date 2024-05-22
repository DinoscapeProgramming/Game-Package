const fs = require("fs");
const path = require("path");
const util = require("../util.js");
const config = require("../config.js");
const users = require("../users.js");
const matches = require("../matches.js");

function configGame(options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || typeof options !== "object") return resolve({ action: "config", err: "Invalid options" });
    module.exports = {
      options
    };
    return resolve({ action: "config", options });
  });
}

function configGameSync(options, extraOptions) {
  if (!options || typeof options !== "object") return { action: "configSync", err: "Invalid options" };
  module.exports = {
    options
  };
  return { action: "configSync", options };
}

function winner(options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "winner", err: "No options were given" });
    if (!Object.keys(options).includes("players") || !options.players) return resolve({ action: "winner", err: "No players were given" });
    return new Promise((resolve, reject) => {
      return resolve({
        action: "winner",
        winner: (
          (
            (
              Object.values(options.players)[0][1] !== 0
            ) && (
              Object.values(options.players)[1][1] !== 0
            )
          ) ? (
            (
              (
                (
                  (
                    (
                      Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
                    ) === "rock"
                  ) && (
                    (
                      Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
                    ) === "scissors"
                  )
                ) || (
                  (
                    (
                      Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
                    ) === "paper"
                  ) && (
                    (
                      Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
                    ) === "rock"
                  )
                ) || (
                  (
                    (
                        Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
                    ) === "scissors"
                  ) && (
                    (
                      Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
                    ) === "paper"
                  )
                )
              ) ? Object.values(options.players)[0][0] : (
                (
                  (
                    (
                      (
                        Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
                      ) === "rock"
                    ) && (
                      (
                        Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
                      ) === "scissors"
                    )
                  ) || (
                    (
                      (
                        Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
                      ) === "paper"
                    ) && (
                      (
                        Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
                      ) === "rock"
                    )
                  ) || (
                    (
                      (
                        Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
                      ) === "scissors"
                    ) && (
                      (
                        Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
                      ) === "paper"
                    )
                  )
                ) ? Object.values(options.players)[1][0] : (
                  (
                    Object.values(options.players)[0][1] === Object.values(options.players)[1][1]
                  ) ? 3 : 0
                )
              )
            )
          ) : 0
        )
      });
    });
  });
}

function winnerSync(options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "winnerSync", err: "No options were given" };
    if (!Object.keys(options).includes("players") || !options.players) return { action: "winnerSync", err: "No players were given" };
  return {
    action: "winnerSync",
    winner: (
      (
        (
          Object.values(options.players)[0][1] !== 0
        ) && (
          Object.values(options.players)[1][1] !== 0
        )
      ) ? (
        (
          (
        (
          (
            (
              Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
            ) === "rock"
          ) && (
            (
              Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
            ) === "scissors"
          )
        ) || (
          (
            (
              Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
            ) === "paper"
          ) && (
            (
              Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
            ) === "rock"
          )
        ) || (
          (
            (
                Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
            ) === "scissors"
          ) && (
            (
              Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
            ) === "paper"
          )
        )
          ) ? Object.values(options.players)[0][0] : (
        (
          (
            (
              (
                Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
              ) === "rock"
            ) && (
              (
                Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
              ) === "scissors"
            )
          ) || (
            (
              (
                Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
              ) === "paper"
            ) && (
              (
                Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
              ) === "rock"
            )
          ) || (
            (
              (
                Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[1][1])[0]
              ) === "scissors"
            ) && (
              (
                Object.entries(module.exports.options).find((item) => item[1] === Object.values(options.players)[0][1])[0]
              ) === "paper"
            )
          )
        ) ? Object.values(options.players)[1][0] : (
          (
            Object.values(options.players)[0][1] === Object.values(options.players)[1][1]
          ) ? 3 : 0
        )
          )
        )
      ) : 0
    )
  };
}

function createMatch(userId, options, extraOptions) {
  return matches.createMatch(userId, options, {
    data: {
      ...{
        players: {
          [userId]: [
            1,
            0
          ],
          [options.playerId]: [
            2,
            0
          ]
        },
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
          [userId]: [
            1,
            0
          ],
          [options.playerId]: [
            2,
            0
          ]
        },
        rounds: Array(extraOptions?.rounds || 1).fill(0)
      },
      ...extraOptions?.data || {}
    }
  });
}

function doMove(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "doMove", err: "No options were given" });
    if (!userId) return resolve({ action: "doMove", err: "No user id was given" });
    if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return resolve({ action: "doMove", err: "Invalid user id" });
    if (!Object.keys(options).includes("matchId") || !options.matchId) return resolve({ action: "doMove", err: "No match id was given" });
    if (!Object.keys(config.readDatabaseSync().data.matches).includes(options.matchId)) return resolve({ action: "doMove", err: "Invalid match id" });
    if (!config.readDatabaseSync().data.matches[options.matchId].players.includes(userId)) return resolve({ action: "doMove", err: "You are not in this match" });
    if (!Object.keys(options).includes("move") || !options.move) return resolve({ action: "doMove", err: "No move was given" });
    if (!Object.values(module.exports.options).includes(Number(options.move))) return resolve({ action: "doMove", err: "Invalid move" });
    var match = config.readDatabaseSync().data.matches[options.matchId];
    winner({
      players: {
        ...match.data.players,
        ...{
          [userId]: [
            match.data.players[userId][0],
            Number(options.move)
          ]
        }
      }
    }).then((result) => {
      if (result.winner === 0) {
        fs.writeFile(require('../config.js').options.file, JSON.stringify({
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
                        players: {
                        ...match.data.players,
                        ...{
                          [userId]: [
                            match.data.players[userId][0],
                            Number(options.move)
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
            }
        }), 'utf8', (err) => {
          if (err) return resolve({ action: "doMove", err: err.message });
          return resolve({
            action: "doMove",
            userId,
            matchId: options.matchId,
            players: {
              ...match.data.players,
              ...{
                [userId]: [
                  match.data.players[userId][0],
                  Number(options.move)
                ]
              }
            },
            move: Number(options.move),
            winner: result.winner
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
              action: "doMove",
              userId,
              matchId: options.matchId,
              players: {
                ...match.data.players,
                ...{
                  [userId]: [
                    match.data.players[userId][0],
                    Number(options.move)
                  ]
                }
              },
              move: Number(options.move),
              winner: result.winner
            });
          });
        });
      }
    });
  });
}

function doMoveSync(userId, options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "doMoveSync", err: "No options were given" };
  if (!userId) return { action: "doMoveSync", err: "No user id was given" };
  if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return { action: "doMoveSync", err: "Invalid user id" };
  if (!Object.keys(options).includes("matchId") || !options.matchId) return { action: "doMoveSync", err: "No match id was given" };
  if (!Object.keys(config.readDatabaseSync().data.matches).includes(options.matchId)) return { action: "doMoveSync", err: "Invalid match id" };
  if (!config.readDatabaseSync().data.matches[options.matchId].players.includes(userId)) return { action: "doMoveSync", err: "You are not in this match" };
  if (!Object.keys(options).includes("move") || !options.move) return { action: "doMoveSync", err: "No move was given" };
  if (!Object.values(module.exports.options).includes(Number(options.move))) return { action: "doMoveSync", err: "Invalid move" };
  var match = config.readDatabaseSync().data.matches[options.matchId];
  if (winnerSync({
    players: {
      ...match.data.players,
      ...{
        [userId]: [
          match.data.players[userId][0],
          Number(options.move)
        ]
      }
    }
  }).winner === 0) {
    try {
      fs.writeFileSync(require('../config.js').options.file, JSON.stringify({
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
                    players: {
                      ...match.data.players,
                      ...{
                        [userId]: [
                          match.data.players[userId][0],
                          Number(options.move)
                        ]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }), 'utf8');
    } catch (err) {
      return { action: "doMoveSync", err: err.message };
    }
    return {
      action: "doMoveSync",
      userId,
      matchId: options.matchId,
      players: {
        ...match.data.players,
        ...{
          [userId]: [
            match.data.players[userId][0],
            Number(options.move)
          ]
        }
      },
      move: options.move,
      winner: winnerSync({
        players: {
          ...match.data.players,
          ...{
            [userId]: [
              match.data.players[userId][0],
              Number(options.move)
            ]
          }
        }
      })
    };
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
    return {
      action: "doMoveSync",
      userId,
      matchId: options.matchId,
      players: {
        ...match.data.players,
        ...{
          [userId]: [
            match.data.players[userId][0],
            Number(options.move)
          ]
        }
      },
      move: Number(options.move),
      winner: winnerSync({
        players: {
          ...match.data.players,
          ...{
            [userId]: [
              match.data.players[userId][0],
              Number(options.move)
            ]
          }
        }
      })
    };
  }
}

module.exports = {
  configGame,
  winner,
  createMatch,
  doMove,
  configGameSync,
  winnerSync,
  createMatchSync,
  doMoveSync
};
