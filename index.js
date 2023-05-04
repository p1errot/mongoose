const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8080;

const Book = require('./models/book.model');
const mongoDB = 'mongodb://localhost:27017/library';

mongoose.connect(mongoDB);

app.get('/', (req, resp) => {
  resp.send('You are in the root');
});

app.get('/books', async (req, resp) => {
  const books = await Book.find().exec();

  resp.json(books);
});

app.get('/books/:id', async (req, resp) => {
  const book = await Book.findOne({ _id: req.params.id });

  return resp.json(book);
});

app.listen(port, () => {
  console.log(`Server http://localhost:${port} started`);
});