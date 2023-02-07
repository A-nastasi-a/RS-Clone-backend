const express = require('express');
const usersRouter = require('./routes/users');
const tablesRouter = require('./routes/tables');
const cardsRouter = require('./routes/cards');

const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;





const app = express();

app.use(express.json());
app.use('/users', usersRouter);
app.use('/tables', tablesRouter);
app.use('/cards', cardsRouter);


const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://Anastasia:pass123word@cluster0.nyvby9z.mongodb.net/?retryWrites=true&w=majority`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();


