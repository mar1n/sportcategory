const express = require('express')
const app = express()
const path = require('path');
const activityList = require('./SportGet')
const port = process.env.PORT || 3001;

app.get('/rest/sport', (req, res) => {
   return res.send(activityList);
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
