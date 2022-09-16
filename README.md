# Game Package
A package you can use to create your own game platform with an implemented match- and user-system with default games like TicTacToe using socket.io

## Documentation
### Configuration
```js
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const socketGames = require('socket.io-games');

socketGames.config.config(app, {
  file: "./db.json"
}).then(() => {
  socketGames.config.clearDatabaseSync();
});
app.use(express.static("pages"));
app.use(express.static("public"));

io.on('connection', (socket, name) => {});

app.all('/', (req, res) => {
  res.sendFile("pages/home/index.html");
});

http.listen(3000, () => {
  console.log("Server is ready");
});
```

### Create Match (TicTacToe)
```js
socket.on("createMatch", (options) => {
  socketGames.games.tictactoe.createMatch(socket.id, options).then((result) => {
    if (!result.err) {
      io.of("/").sockets.get(result.playerId).emit("newMatch", result);
    }
  });
});
```

### Create Match (Connect Four)
```js
socket.on("createMatch", (options) => {
  socketGames.games.connectfour.createMatch(socket.id, options).then((result) => {
    if (!result.err) {
      io.of("/").sockets.get(result.playerId).emit("newMatch", result);
    }
  });
});
```

### Accept Match
```js
socket.on("acceptMatch", (options) => {
  socketGames.matches.acceptMatch(socket.id, options).then((result) => {
    if (!result.err) {
      socket.emit("acceptMatch", result);
    }
  });
});
```

### Reject Match
```js
socket.on("rejectMatch", (options) => {
  if (socketGames.config.readFileSync().data.matches[options.matchId]?.status === "pending") {
    socketGames.matches.rejectMatch(socket.id, options).then((result) => {
      if (!result.err) {
        socket.emit("rejectMatch", result);
      }
    });
  }
});
```

### Open Match
```js
socket.on("openMatch", (options) => {
  try {
    socketGames.config.readFileSync().data?.matches?.[options.matchId]?.players.forEach((player) => {
      io.of("/").sockets.get(player).emit("openMatch", {
        matchId: options.matchId,
        turn: socketGames.config.readFileSync().data?.matches?.[options.matchId]?.data.turn,
        players: socketGames.config.readFileSync().data?.matches?.[options.matchId]?.data?.players,
        users: socketGames.users.allUsersSync().users
      });
    });
  } catch (err) {}
});
```

### Place Field (TicTacToe)
```js
socket.on("placeField", (options) => {
  try {
    socketGames.games.tictactoe.placeField(socket.id, options).then((result) => {
      if (!result.err) {
        Object.keys(result.players).forEach((player) => {
          io.of("/").sockets.get(player).emit("placeField", {
            ...result,
            ...{
              users: socketGames.users.allUsersSync().users
            }
          });
        });
      }
    });
  } catch (err) {}
});
```

### Place Field (Connect Four)
```js
socket.on("placeField", (options) => {
  try {
    socketGames.games.connectfour.placeField(socket.id, options).then((result) => {
      if (!result.err) {
        Object.keys(result.players).forEach((player) => {
          io.of("/").sockets.get(player).emit("placeField", {
            ...result,
            ...{
              users: socketGames.users.allUsersSync().users
            }
          });
        });
      }
    });
  } catch (err) {}
});
```

### Create User
```js
socket.on("createUser", (options) => {
  socketGames.users.createUser(socket.id, options).then(() => {
    socketGames.users.allUsers().then((result) => {
      io.emit("userUpdate", result.users);
    });
  });
});
```

### Delete User
```js
socket.on("disconnect", () => {
  socketGames.users.deleteUser(socket.id, io).then((deletedUser) => {
    if (!deletedUser.err) {
      socketGames.users.allUsers().then((result) => {
        io.emit("userUpdate", result.users);
        deletedUser.matches.forEach((match) => {
          match[1].players.filter((player) => player !== socket.id).forEach((player) => {
            io.of("/").sockets.get(player).emit("roomLeave", {
              username: result.users[player].username
            });
          });
        });
      });
    }
  });
});
```

## Example
```js
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const socketGames = require('socket.io-games');

socketGames.config.config(app, {
  file: "./db.json"
}).then(() => {
  socketGames.config.clearDatabaseSync();
});
app.use(express.static("pages"));
app.use(express.static("public"));

io.on('connection', (socket, name) => {
  socket.on("createUser", (options) => {
    socketGames.users.createUser(socket.id, options).then(() => {
      socketGames.users.allUsers().then((result) => {
        io.emit("userUpdate", result.users);
      });
    });
  });
  socket.on("createMatch", (options) => {
    socketGames.games.tictactoe.createMatch(socket.id, options).then((result) => {
      if (!result.err) {
        io.of("/").sockets.get(result.playerId).emit("newMatch", result);
      }
    });
  });
  socket.on("acceptMatch", (options) => {
    socketGames.matches.acceptMatch(socket.id, options).then((result) => {
      if (!result.err) {
        socket.emit("acceptMatch", result);
      }
    });
  });
  socket.on("rejectMatch", (options) => {
    if (socketGames.config.readFileSync().data.matches[options.matchId]?.status === "pending") {
      socketGames.matches.rejectMatch(socket.id, options).then((result) => {
        if (!result.err) {
          socket.emit("rejectMatch", result);
        }
      });
    }
  });
  socket.on("openMatch", (options) => {
    try {
      socketGames.config.readFileSync().data?.matches?.[options.matchId]?.players.forEach((player) => {
        io.of("/").sockets.get(player).emit("openMatch", {
          matchId: options.matchId,
          turn: socketGames.config.readFileSync().data?.matches?.[options.matchId]?.data.turn,
          players: socketGames.config.readFileSync().data?.matches?.[options.matchId]?.data?.players,
          users: socketGames.users.allUsersSync().users
        });
      });
    } catch (err) {}
  });
  socket.on("placeField", (options) => {
    try {
      socketGames.games.tictactoe.placeField(socket.id, options).then((result) => {
        if (!result.err) {
          Object.keys(result.players).forEach((player) => {
            io.of("/").sockets.get(player).emit("placeField", {
              ...result,
              ...{
                users: socketGames.users.allUsersSync().users
              }
            });
          });
        }
      });
    } catch (err) {}
  });
  socket.on("disconnect", () => {
    socketGames.users.deleteUser(socket.id, io).then((deletedUser) => {
      if (!deletedUser.err) {
        socketGames.users.allUsers().then((result) => {
          io.emit("userUpdate", result.users);
          deletedUser.matches.forEach((match) => {
            match[1].players.filter((player) => player !== socket.id).forEach((player) => {
              io.of("/").sockets.get(player).emit("roomLeave", {
                username: result.users[player].username
              });
            });
          });
        });
      }
    });
  });
});

app.all('/', (req, res) => {
  res.sendFile("pages/home/index.html");
});

http.listen(3000, () => {
  console.log("Server is ready");
});
```

## Client Side Documentation
### Configuration
```html
<script src="/socket.io/socket.io.js">
```
```js
const socket = io();
```

### Actions
#### Create User
```js
socket.emit("createUser", {
  username: "My Username"
});
```

#### Create Match
```js
socket.emit("createMatch", {
  playerId: "player id"
});
```

#### Accept Match
```js
socket.emit("acceptMatch", {
  matchId: "match id"
});
```

#### Reject Match
```js
socket.emit("rejectMatch", {
  matchId: "match id"
});
```

#### Open Match
```js
socket.emit("openMatch", {
  matchId: "match id"
});
```

#### Place Field
```js
socket.emit("placeField", {
  matchId: "match id",
  field: "1" // number from 1 to 9
})
```

### Events
#### User Update
```js
socket.on("userUpdate", (options) => {
  console.log(options.users); // do some stuff with the users
});
```

#### New Match
```js
socket.on("newMatch", (options) => {
  console.log(options.username, options.matchId); // do some stuff with the match request
});
```

#### Accept Match
```js
socket.on("acceptMatch", (options) => {
  console.log(options.matchId); // do some stuff with the accepted match
  socket.emit("openMatch", { matchId: options.matchId }); // open the accepted match
});
```

#### Reject Match
```js
socket.on("rejectMatch", (options) => {
  console.log(options.matchId); // do some stuff with the rejected match
});
```

#### Open Match
```js
socket.on("openMatch", (options) => {
  console.log(options.users[socket.id], options.users[Object.entries(options.players).filter((item) => item[0] !== socket.id)[0][0]].username, options.turn); // do some stuff with the opened match
});
```

#### Place Field
```js
socket.on("placeField", (options) => {
  console.log(options.field); // do some stuff with the placed field
});
```

#### Room Leave
```js
socket.on("roomLeave", (options) => {
  console.log(options.username); // do some stuff with the user who left
});
```

## Example Site
https://tictactoe.dinoscape.tk