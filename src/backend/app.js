const express = require('express')
const app = express()
const port = 3000
const sportget = require('./SportGet');

app.get('/rest/sport', (req, res) => res.send(sportget))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
