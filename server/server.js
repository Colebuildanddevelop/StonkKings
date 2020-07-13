// server.js
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
app.use(bodyParser());

const connectionString = `mongodb+srv://user:123@cluster0-4isuu.mongodb.net/stonks?retryWrites=true&w=majority`;

MongoClient.connect(connectionString, {useUnifiedTopology: true})
  .then(client => {
    console.log("Connected to Database")
    const db = client.db('pet-store')
    const dogNameCollection = db.collection('dog-names')

    app.get('/form', (req, res) => {
      res.sendFile(__dirname + '/index.html')
    })

    app.get('/dog-names', (req, res) => {
      db.collection('dog-names').find().toArray()
        .then(results => {
          res.send(results)
        })
        .catch(console.error)
    })
    
    app.put('/dog-names', (req, res) => {
      dogNameCollection.findOneAndUpdate(
        {dogName: req.body.dogName},
        {
          $set: {dogName: req.body.newName}
        }
      )
      .then(console.log)
      .catch(console.error)
      res.redirect('/dog-names');
    })

    app.post('/dog-names', (req, res) => {
      dogNameCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/form')
        })
        .then(console.error)
    })
    
    app.delete('/dog-names', (req, res) => {
      dogNameCollection.remove(
        {dogName: req.body.dogName},
      )
      .then(console.log)
      .catch(console.error)
      res.redirect('/dog-names')
    })
    
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
})