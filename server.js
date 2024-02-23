const mysql = require("mysql2");
const express = require("express");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chatbottests",
  password: ""
});
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ' + err.stack);
    return;
  }
  console.log('Подключено к базе данных с id ' + connection.threadId);
});
app.get('/getAllItems', (req, res) => {
  connection.query('SELECT * FROM items', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
app.post('/addItem', (req, res) => {
  const { name, desc } = req.query;

  if (!name || !desc) {
    res.json({ result: null });
    return;
  }

  connection.query('INSERT INTO items (name, desc) VALUES (?, ?)', [name, desc], (error, results) => {
    if (error) throw error;

    const newItemId = results.insertId;
    res.json({ id: newItemId, name, desc });
  });
});
app.post('/deleteItem', (req, res) => {
  const itemId = parseInt(req.query.id);

  if (isNaN(itemId)) {
      res.json({ result: null });
      return;
  }

  connection.query('DELETE FROM items WHERE id = ?', [itemId], (error, results) => {
      if (error) throw error;

      const isItemDeleted = results.affectedRows > 0;
      res.json({ result: isItemDeleted });
  });
});
app.post('/updateItem', (req, res) => {
  const itemId = parseInt(req.query.id);
  const { name, desc } = req.query;

  if (isNaN(itemId) || !name || !desc) {
      res.json({ result: null });
      return;
  }

  connection.query('UPDATE items SET name = ?, desc = ? WHERE id = ?', [name, desc, itemId], (error, results) => {
      if (error) throw error;

      const isItemUpdated = results.changedRows > 0;
      res.json({ result: isItemUpdated });
  });
});
connection.end(function (err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});