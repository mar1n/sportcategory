const express = require('express')
const db = require('./db')
const path = require('path')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const multer = require('multer')
const upload = multer({
    dest: 'temp/', limits: {
        fieldSize: 3 * 1000,
        fieldIds: 10,
        fileSize: 2.5 * 1000 * 1000,
        files: 2,
        parts: 12
    }
})
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 12
const forge = require('node-forge')
const app = express()
const port = process.env.PORT || 3001
const DB_ADMIN_PWD = process.env.DB_ADMIN_PWD
const blacklist = {
    imageNames: ['default']
}


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
            {
                $set: {
                    password: hashedPassword,
                    isAdmin: true
                }
            },
            { upsert: true }
        )
    })
})

app.get('/loggedIn', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    if (req.session.username) {
        res.end(JSON.stringify({
            result: true,
            username: req.session.username,
            ...(req.session.isAdmin ? { isAdmin: true } : {})
        }))
    } else {
        res.end(JSON.stringify({
            result: false,
            username: null
        }))
    }
})

app.get('/logout', (req, res) => {
    console.log(req.session.id)
    const id = req.session.id
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            res.end(JSON.stringify({
                result: false,
                message: 'Could not Log out!'
            }))
        } else {
            connection.then(dbo => {
                dbo.collection('sessions').deleteOne({ _id: id }, 
                    (error, result) => {
                        if (error) Promise.reject(error)
                        console.log("Session deleted from database: " + result)
                    }
                )
            })
            console.log("Session destroyed!");
            res.end(JSON.stringify({
                result: true,
                message: 'Successfully Logged out!'
            }))
        }
    })
})

app.post('/login', jsonParser, (req, response, next) => {
    const { username, password } = req.body
    response.setHeader('Content-Type', 'application/json')

    if (typeof username !== 'string' || typeof password !== 'string') {
        response.send(401)
        return next()
    }
    connection.then(dbo => {
        dbo.collection('users').findOne({ username }, (error, result) => {
            if (error) Promise.reject(error)
            if (result) {
                bcrypt.compare(password, result.password, (err, res) => {
                    if (err) Promise.reject(err)
                    if (res) {
                        if (result.isAdmin) {
                            req.session.isAdmin = true
                            req.session.username = username
                        }
                        response.end(JSON.stringify({
                            result: true,
                            message: 'Successful login!',
                            username,
                            ...(result.isAdmin ? { isAdmin: true } : {})
                        }))
                    } else {
                        response.end(JSON.stringify({
                            result: false,
                            message: 'Invalid login details'
                        }))
                    }
                });
            } else {
                response.end(JSON.stringify({
                    result: false,
                    message: 'Invalid login details'
                }))
            }
        })
    })
})



app.get('/rest/sport/:id', (req, res) => {
    connection.then(dbo => {
        dbo.collection('sports').findOne({ id: req.params.id }, (error, results) => {
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

app.post('rest/admin/addSport', upload.fields([{
    name: 'imageCover',
    maxCount: 1
},
{
    name: 'imageBackground',
    maxCount: 1
}
]), (req, res, next) => {
    if (!req.session.isAdmin) {
        res.send(401)
        next()
    }
    console.log(Object.entries(req))
    let formData = req.body
    console.log("Form data: " + Object.entries(formData))
    if (req.files['imageCover']) {
        console.log("Length of imageCover array is: " + req.files['imageCover'].length)
        let imageCover = req.files['imageCover'][0]
        console.log("ImageCover: " + imageCover +
            "image fieldname: " + imageCover.fieldname +
            "image originalname: " + imageCover.orginalname +
            "image encoding: " + imageCover.endcoding +
            "image mimtype: " + imageCover.mimetype +
            "image size: " + imageCover.size +
            "image destination: " + imageCover.destination +
            "image filename: " + imageCover.filename +
            "image path: " + imageCover.path +
            "image buffer: " + imageCover.buffer
        )
    }
    let imageCoverPath = path.join(__dirname, "../images/list")
    let imageBackgroundPath = path.join(__dirname, "../images/background")
    console.log(imageCoverPath)
    console.log(imageBackgroundPath)
    res.end('good')
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