const fs = require('fs');
const path = require('path');
const util = require('../util.js');
const config = require('../config.js');
const users = require('../users.js');
const matches = require('../matches.js');

function winner(options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "winner", err: "No options were given" });
    if (!Object.keys(options).includes("cards") || !options.cards) return resolve({ action: "winner", err: "No cards were given" });
    if (JSON.stringify(options.cards.filter((card) => card.revealer !== 0).map((card) => card.number)) === "[1,1]") {
      return resolve({ action: "winner", winner: 1 });
    } else if (JSON.stringify(options.cards.filter((card) => card.revealer !== 0).map((card) => card.number)) === "[2,2]") {
      return resolve({ action: "winner", winner: 2 });
    } else {
      return resolve({ action: "winner", winner: 0 });
    }
  });
}

function winnerSync(options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "winner", err: "No options were given" };
  if (!Object.keys(options).includes("cards") || !options.cards) return { action: "winner", err: "No cards were given" };
  if (JSON.stringify(options.cards.filter((card) => card.revealer !== 0).map((card) => card.number)) === "[1,1]") {
    return { action: "winner", winner: 1 };
  } else if (JSON.stringify(options.cards.filter((card) => card.revealer !== 0).map((card) => card.number)) === "[2,2]") {
    return { action: "winner", winner: 2 };
  } else {
    return { action: "winner", winner: 0 };
  }
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
        turn: (Math.floor(Math.random() * 2) === 1) ? 1 : 3, 
        cards: util.generateRandomNumbersSync({ count: extraOptions.cards.length }).numbers.map((number) => ({ data: extraOptions.cards[number - 1], number, revealer: 0 })),
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
        turn: (Math.floor(Math.random() * 2) === 1) ? 1 : 3,
        cards: util.generateRandomNumbersSync({ count: extraOptions.cards.length }).numbers.map((number) => ({ data: extraOptions.cards[number - 1], number, revealer: 0 })),
        rounds: Array(extraOptions?.rounds || 1).fill(0)
      },
      ...extraOptions?.data || {}
    }
  });
}

function revealCard(userId, options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "revealCard", err: "No options were given" });
    if (!userId) return resolve({ action: "revealCard", err: "No user id was given" });
    if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return resolve({ action: "revealCard", err: "Invalid user id" });
    if (!Object.keys(options).includes("matchId") || !options.matchId) return resolve({ action: "revealCard", err: "No match id was given" });
    if (!Object.keys(config.readDatabaseSync().data.matches).includes(options.matchId)) return resolve({ action: "revealCard", err: "Invalid match id" });
    if (!config.readDatabaseSync().data.matches[options.matchId].players.includes(userId)) return resolve({ action: "revealCard", err: "You are not in this match" });
    if (config.readDatabaseSync().data.matches[options.matchId].data.players[userId][0] !== config.readDatabaseSync().data.matches[options.matchId].data.turn) return resolve({ action: "revealCard", err: "It is not your turn" });
    if (!Object.keys(options).includes("card") || !options.card) return resolve({ action: "revealCard", err: "No card was given" });
    var match = config.readDatabaseSync().data.matches[options.matchId];
    var cards = match.data.cards;
    if ((match.data.turn === 1) || (match.data.turn === 3)) {
      cards = cards.map((card) => ({ ...card, ...{ revealer: 0 } }));
    }
    cards.splice(Number(options.card), 0, {
      ...cards.find((_, index) => index === Number(options.card)),
      ...{
        revealer: match.data.players[userId][0]
      }
    });
    winner({ cards }).then((result) => {
      if ((result.winner === 0) || (match.data.players[userId][1] !== ((match.data.cards.length / 2) - 1))) {
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
                      cards,
                      turn: ((match.data.turn + 1) > 4) ? 1 : match.data.turn + 1,
                      players: {
                        ...match.data.players,
                        ...{
                          [userId]: [
                            match.data.players[userId][0],
                            (match.data.players[userId][1]) + ((result.winner !== 0) ? 1 : 0)
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }), "utf8", (err)  => {
          if (err) return resolve({ action: "revealCard", err: err.message });
          return resolve({
            action: "revealCard",
            userId,
            matchId: options.matchId,
            players: {
              ...match.data.players,
              ...{
                [userId]: [
                  match.data.players[userId][0],
                  (match.data.players[userId][1]) + ((result.winner !== 0) ? 1 : 0)
                ]
              }
            },
            card: options.card,
            winner: result.winner,
            turn: ((match.data.turn + 1) > 4) ? 1 : match.data.turn + 1,
            cards
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
              action: "revealCard",
              userId,
              matchId: options.matchId,
              players: {
                ...match.data.players,
                ...{
                  [userId]: [
                    match.data.players[userId][0],
                    (match.data.players[userId][1]) + ((result.winner !== 0) ? 1 : 0)
                  ]
                }
              },
              card: options.card,
              winner: result.winner,
              turn: ((match.data.turn + 1) > 4) ? 1 : match.data.turn + 1,
              cards
            });
          });
        });
      }
    });
  });
}

function revealCardSync(userId, options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "placeFieldSync", err: "No options were given" };
  if (!userId) return { action: "placeFieldSync", err: "No user id was given" };
  if (!Object.keys(config.readDatabaseSync().data.users).includes(userId)) return { action: "placeFieldSync", err: "Invalid user id" };
  if (!Object.keys(options).includes("matchId") || !options.matchId) return { action: "placeFieldSync", err: "No match id was given" };
  if (!Object.keys(config.readDatabaseSync().data.matches).includes(options.matchId)) return { action: "placeFieldSync", err: "Invalid match id" };
  if (!config.readDatabaseSync().data.matches[options.matchId].players.includes(userId)) return { action: "placeFieldSync", err: "You are not in this match" };
  if (config.readDatabaseSync().data.matches[options.matchId].data.players[userId][0] !== config.readDatabaseSync().data.matches[options.matchId].data.turn) return { action: "placeFieldSync", err: "It is not your turn" };
  if (!Object.keys(options).includes("card") || !options.card) return { action: "placeFieldSync", err: "No card was given" };
  var match = config.readDatabaseSync().data.matches[options.matchId];
  var cards = match.data.cards;
  if ((match.data.turn === 1) || (match.data.turn === 3)) {
    cards = cards.map((card) => ({ ...card, ...{ revealer: 0 } }));
  }
  cards.splice(options.card, 0, {
    ...cards.find((_, index) => index === options.card),
    ...{
      revealer: match.data.players[userId][0]
    }
  });
  if (winnerSync({ cards }).winner === 0 || (match.data.players[userId][1] !== ((match.data.cards.length / 2) - 1))) {
    try {
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
                    cards,
                    turn: ((match.data.turn + 1) > 4) ? 1 : match.data.turn + 1,
                    players: {
                      ...match.data.players,
                      ...{
                        [userId]: [
                          match.data.players[userId][0],
                          (match.data.players[userId][1]) + ((result.winner !== 0) ? 1 : 0)
                        ]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }), "utf8");
    } catch (err) {
      return { action: "placeField", err: err.message };
    }
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
  return {
    action: "placeFieldSync",
    userId,
    matchId: options.matchId,
    players: {
      ...match.data.players,
      ...{
        [userId]: [
          match.data.players[userId][0],
          (match.data.players[userId][1]) + ((result.winner !== 0) ? 1 : 0)
        ]
      }
    },
    card: options.card,
    winner: winnerSync({ cards }).winner,
    turn: ((match.data.turn + 1) > 4) ? 1 : match.data.turn + 1,
    cards
  };
}

module.exports = {
  winner,
  createMatch,
  revealCard,
  winnerSync,
  createMatchSync,
  revealCardSync
}
