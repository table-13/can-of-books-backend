"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3009;
const app = express();
const mongoose = require("mongoose");
app.use(cors());
const Book = require("./models/book");
mongoose.connect("mongodb://localhost:27017/books");
app.use(express.json());

// const anthonyBook = new Book({
//   title: "Jurrasic Park",
//   description:
//     "A cautionary tale about genetic engineering, it presents the collapse of an amusement park showcasing genetically re-created dinosaurs to illustrate the mathematical concept of chaos theory and its real-world implications.",
//   status: true,
//   email: "anthonymorton760@gmail.com",
// });
// const brianBook = new Book({
//   title: "Redwall",
//   description:
//     "Originally published in 1986, it is the first book of the Redwall series.",
//   status: true,
//   email: "bkasprzyk@outlook.com",
// });
// const harveyBook = new Book({
//   title: "Odyssey",
//   description:
//     "The Odyssey is one of two major ancient Greek epic poems attributed to Homer",
//   status: true,
//   email: "tripppdx@gmail.com",
// });
// anthonyBook.save(function (err) {
//   if (err) console.error(err);
//   else console.log("Anthony Book");
// });
// brianBook.save(function (err) {
//   if (err) console.error(err);
//   else console.log("Brian Book");
// });
// harveyBook.save(function (err) {
//   if (err) console.error(err);
//   else console.log("Harvey Book");
// });
app.post("/books", async (request, response) => {
  try {
    const bookInfo = request.body;
    console.log(bookInfo);
    const newBook = await Book.create({
      title: bookInfo.title,
      description: bookInfo.description,
      email: bookInfo.email,
      status: bookInfo.status,
    });
    console.log(newBook);
    response.status(201).send(newBook);
  } catch (error) {
    response.status(500).send("Error creating boook");
  }
});

app.delete("/books/:id/:email", async (request, response) => {
  const id = request.params.id;
  const email = request.params.email;

  const book = await Book.findById(id);

  if (email) {
    if (book.email === email) {
      try {
        await Book.findByIdAndDelete(id);
        response.status(204).send("success");
      } catch (error) {
        response.status(404).send("Unable to delete book with id ${id}");
      }
    }
  }
});

app.get("/books/", async (request, response) => {
  const books = await Book.find({});
  response.send(books);
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
