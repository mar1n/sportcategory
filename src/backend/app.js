const express = require('express')
const db = require('./db')
const path = require('path')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 12
const forge = require('node-forge')
const app = express()
const port = process.env.PORT || 3001
const DB_ADMIN_PWD = process.env.DB_ADMIN_PWD
app.use(db.sessionStore())

const connection = db.connect()

connection.then(dbo => {
   const users = dbo.collection('users')

   let md = forge.md.sha256.create()
   md.update(DB_ADMIN_PWD)
   const password = md.digest().toHex()
   bcrypt.hash(password, SALT_ROUNDS).then(hashedPassword => {
       users.updateOne(
           { username: 'Admin' },
           { $set: {
               password: hashedPassword,
               isAdmin: true
           }},
           { upsert: true }
       )
   })
})

app.post('/login', jsonParser, (req, response) => {
    const { username, password } = req.body;
    response.setHeader('Content-Type', 'application/json')
    if (typeof username !== 'string' || typeof password !== 'string') {
        response.send("Invalid input")
    }
    connection.then(dbo => {
        dbo.collection('users').findOne({ username }, (error, result) => {
            if (error) Promise.reject(error)
            if (result) {
                bcrypt.compare(password, result.password, (err, res) => {
                    if (err) Promise.reject(err)
                    if (res) {
                        if (result.isAdmin) {
                            req.session.isAdmin = true;
                            req.session.username = username;
                        }
                        response.end(JSON.stringify({
                            result: true,
                            message: 'Successful login!',
                            username
                        }))
                    } else { 
                        response.end(JSON.stringify({
                            result: false,
                            message: 'Invalid login details'
                        }))
                    }
                })
            } else { 
                response.end(JSON.stringify({
                    result: false,
                    message: 'Invalid login details'
                }))
            }
        }
        )
    })
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