"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3009;
const app = express();
const mongoose = require("mongoose");
app.use(cors());
const Book = require("./models/book");
mongoose.connect(process.env.MONGODB_URI);
app.use(express.json());
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
 console.log(request.query.email)
  try{
    const userBook ={}
    if(request.query.email){
      userBook.email = request.query.email;
      
    }
    const books = await Book.find({userBook});
    console.log(userBook)
    response.send(books);
  }
  catch(error){
    console.log(`can't get yo books`)
  }
  
});

app.put("/books/:id", async (request, response) => {
  const id = request.params.id;
  const email = request.query.email;
  try {
    const bookToUpdate = await Book.findOne({ _id: id });
    if (!bookToUpdate) {
      response.status(400).send("Unable to update book");
      return;
    }
    const updatedBook = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    response.send(updatedBook);
  } catch (error) {
    response.status(400).send("unable to update book");
  }
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
