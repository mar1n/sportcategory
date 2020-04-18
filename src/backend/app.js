const express = require('express')
const app = express()
const path = require('path');
const db = require('./db');
const connection = db.connect();
const port = process.env.PORT || 3001;

app.get('/rest/sport', (req, res) => {
   connection.then(dbo => {
      dbo.collection('sports').find({}).toArray((error, results) => {
          if (error) Promise.reject(error);
          res.send(results);
      });
  });
 });

app.use(express.static(path.join(__dirname, '../../build')));

app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, '../../build', './public/index.html'));
});

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
