const sqlite3 = require("sqlite3").verbose();

let db;

function connect() {
  db = new sqlite3.Database("database.sqlite", (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  });
}

function getTasks(callback) {
  db.all("SELECT * FROM tasks", callback);
}

function updateTask(id, task, callback) {
  var modify = [];
  var processed = {};
  for (var key in task) {
    modify.push(key + " = $" + key);
    processed["$" + key] = task[key];
  }
  const query = "UPDATE tasks SET " + modify.join(", ") + ` WHERE id = ${id}`;
  db.run(query, processed, callback);
}

function deleteTask(id, callback) {
  db.run("DELETE FROM tasks WHERE id = ?", [id], callback);
}

function addTask(callback) {
  db.run(
    "INSERT INTO tasks VALUES (NULL, '', '', NULL, false, false)",
    function (err) {
      callback(err, this.lastID);
    }
  );
}

function closeConnection(callback) {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
      callback();
    });
  } else {
    callback();
  }
}

module.exports = {
  connect,
  getTasks,
  updateTask,
  deleteTask,
  addTask,
  closeConnection,
};
