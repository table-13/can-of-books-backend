const mongoose = require('mongoose')
const {schema} = mongoose;

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: Boolean,
  email: String
});

const Book = mongoose.model('Book', bookSchema)
module.exports = Book;