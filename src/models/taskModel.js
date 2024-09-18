const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../db/todos.db');

db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  due_date TEXT NOT NULL,
  status TEXT DEFAULT 'pendente',
  history TEXT DEFAULT NULL
)`);

const getAllTasks = (callback) => {
  db.all(`SELECT * FROM tasks`, [], (err, rows) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, rows);
  });
};

const addTask = (title, due_date, callback) => {
  db.run(`INSERT INTO tasks (title, due_date, status) VALUES (?, ?, 'pendente')`, [title, due_date], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID });
  });
};

const editTask = (id, title, due_date, callback) => {
  db.run(`UPDATE tasks SET title = ?, due_date = ?, history = history || ? WHERE id = ?`, [title, due_date, `\nEdited on ${new Date().toISOString()}`, id], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

const updateTaskStatus = (id, status, callback) => {
  db.run(`UPDATE tasks SET status = ? WHERE id = ?`, [status, id], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

const deleteTask = (id, callback) => {
  db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

module.exports = { getAllTasks, addTask, editTask, updateTaskStatus, deleteTask };
