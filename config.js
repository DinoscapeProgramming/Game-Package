const fs = require('fs');

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(module.exports.options.file, function (err, data) {
      if (err) return resolve({ action: "readFile", err: err.message });
      return resolve({ action: "readFile", data });
    });
  });
}

function readFileSync() {
  try {
    return { action: "readFileSync", data: JSON.parse(fs.readFileSync(module.exports.options.file, 'utf8')) };
  } catch (err) {
    return { action: "readFileSync", err: err.message };
  }
}

function clearDatabase(options) {
  return new Promise((resolve, reject) => {
    fs.writeFile(module.exports.options.file, JSON.stringify({
      users: {},
      matches: {}
    }), "utf8", (err) => {
      if (err) return resolve({ action: "clearDatabase", err: err.message });
      return resolve({ action: "clearDatabase", database: module.exports.options.file });
    });
  });
}

function clearDatabaseSync(options) {
  try {
    fs.writeFileSync(module.exports.options.file, JSON.stringify({
      users: {},
      matches: {}
    }), "utf8");
  } catch (err) {
    return { action: "clearDatabaseSync", err: err.message };
  }
  return { action: "clearDatabaseSync", database: module.exports.options.file };
}

function config(app, options) {
  return new Promise((resolve, reject) => {
    if (!app || !app.all) return resolve({ action: "config", err: "Invalid app" });
    if (!options || typeof options !== "object") return resolve({ action: "config", err: "Invalid options" });
    fs.readdir(__dirname + "/templates", (err, templates) => {
      if (err) return resolve({ action: "config", err: err.message });
      templates.forEach((template) => {
        app.all("/socket.io-games/" + template.substring(0, template.length - 3), (req, res) => {
          res.sendFile("templates/" + template, { root: __dirname });
        });
      });
    });
    module.exports = {
      options
    }
    return resolve({ action: "config", options });
  });
}

function configSync(app, options) {
  if (!app || !app.all) return resolve({ action: "configSync", err: "Invalid app" });
  if (!options || typeof options !== "object") return { action: "configSync", err: "Invalid options" };
  try {
    fs.readdirSync(__dirname + "/templates").forEach((template) => {
      app.all("/socket.io-games/" + template.substring(0, template.length - 3), (req, res) => {
        res.sendFile("templates/" + template, { root: __dirname });
      });
    });
  } catch (err) {
    return { action: "configSync", err: err.message };
  }
  module.exports = {
    options
  }
  return { action: "configSync", options };
}

module.exports = {
  readFile,
  clearDatabase,
  config,
  readFileSync,
  clearDatabaseSync,
  configSync
}