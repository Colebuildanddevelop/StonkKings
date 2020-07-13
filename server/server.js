const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./routes/user.js')

const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect('mongodb+srv://user:123@cluster0-4isuu.mongodb.net/stonks?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(UserRouter)


app.listen(3000, () => { console.log('Server is running...') });