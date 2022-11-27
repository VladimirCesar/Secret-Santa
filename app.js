require('dotenv').config();
const express = require('express');
const dataman = require('./dataman');
const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/test_build/index.html");
});

app.get('/new_user/:username/:password', (req, res) => {
  dataman.users_database.find({ username: req.params.username }, (err, docs) => {
    if (docs.length > 0) {
      res.status(400).send("Пользователь с таким именем уже существует");
      return;
    }
    dataman.users_database.insert({
      username: req.params.username,
      password: req.params.password,
    }, (err, data) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send('Пользователь создан');
    });
  });
});

app.post('/auth', (req, res) => {
  dataman.users_database.find({ username: req.body.login }, (err, docs) => {
    if (docs.length === 0) {
      res.status(400).send("Пользователь не найден");
      return;
    }
    const user_doc = docs[0];
    if (user_doc.password != req.body.password) {
      res.status(400).send("Неверный пароль");
      return;
    }
    res.status(200).send(user_doc['_id']);
  });
});

app.listen(port, () => {
  console.log(`Node serv is listening on port ${port}`);
});