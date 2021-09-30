const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);
const Book = require('./models/book.js');

async function seed(){
  const anthonyBook = await new Book({
    title: 'Jurrasic Park',
    description: 'A cautionary tale about genetic engineering, it presents the collapse of an amusement park showcasing genetically re-created dinosaurs to illustrate the mathematical concept of chaos theory and its real-world implications.',
    status: true,
    email: 'anthonymorton760@gmail.com'

  });
  const brianBook = await new Book({
    title: 'Redwall',
    description: 'Originally published in 1986, it is the first book of the Redwall series.',
    status: true,
    email: 'bkasprzyk@outlook.com'

  });
  const harveyBook = await new Book({
    title: 'Odyssey',
    description: 'The Odyssey is one of two major ancient Greek epic poems attributed to Homer',
    status: true,
    email: 'tripppdx@gmail.com'

  });
  anthonyBook.save(function (err) {
    if (err) console.error(err);
    else console.log('saved Jimmy John');
  });
  brianBook.save();
  harveyBook.save();
  mongoose.disconnect();
};

seed();