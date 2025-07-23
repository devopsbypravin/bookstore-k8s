const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const BookSchema = new mongoose.Schema({ title: String });
const Book = mongoose.model('Book', BookSchema);

mongoose.connect(process.env.MONGO_URL || "mongodb://mongo:27017/books");

app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).send(book);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
