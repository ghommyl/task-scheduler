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

function updateTask(task, callback) {
  db.run(
    "UPDATE tasks SET title = $title, description = $description, end_date = $end_date, show_description = $show_description, show_end_date = $show_end_date WHERE id = $id",
    task,
    callback
  );
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
