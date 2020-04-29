const express = require('express')
const app = express()
const path = require('path')
const db = require('./db')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const connection = db.connect()
const port = process.env.PORT || 3001



app.post('/login', jsonParser, (req, res) => {
   res.send('test, username: ' + req.body.username + " password: " + req.body.password);
})


app.get('/rest/sport/:id', (req, res) => {
   connection.then(dbo => {
      dbo.collection('sports').findOne({id: req.params.id},(error, results) => {
          if (error) Promise.reject(error)
          res.send(results)
      })
  })
 })

app.get('/rest/sport/', (req, res) => {
   connection.then(dbo => {
      dbo.collection('sports').find({}).toArray((error, results) => {
          if (error) Promise.reject(error)
          res.send(results)
      })
  })
 })



app.use(express.static(path.join(__dirname, '../../build')))

app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
