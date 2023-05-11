const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8080;

const Book = require('./models/book.model');
const mongoDB = 'mongodb://localhost:27017/library';

mongoose.connect(mongoDB);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

app.post('/books', async (req, resp) => {
  const bookResp = await Book.create(req.body);

  if (!bookResp) {
    resp.send('Error creating the book');
    return;
  }

  resp.send(bookResp);
});

app.put('/books/:id', async (req, resp) => {
  const newData = await Book.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });

  resp.send(newData);
});

app.delete('/books/:id', async (req, resp) => {
  await Book.findOneAndRemove({ _id: req.params.id });

  resp.status(204);
  resp.send();
});

app.listen(port, () => {
  console.log(`Server http://localhost:${port} started`);
});