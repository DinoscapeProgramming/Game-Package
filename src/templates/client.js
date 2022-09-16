class Client {
  constructor(socket, options) {
    Object.entries(options || {}).forEach((option) => {
      this[option[0]] = function () {
        if (option[1].event) {
          socket.emit(option[1].event);
        }
        if (option[1].function) {
          option[1].function();
        }
      }
    });
  } 
}