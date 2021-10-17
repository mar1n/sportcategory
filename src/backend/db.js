require('dotenv').config()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const DB_SESSION_SALT = 'keyboard cat'
const MongoClient = require('mongodb').MongoClient

const url2 = 'mongodb+srv://sportmen:turboman54@cluster0-onxaf.mongodb.net/categorysport?retryWrites=true&w=majority'
const dbName = 'categorysport'

function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url2, { useUnifiedTopology: true, useNewUrlParser: true },  (error, db) => {
            if (error) reject(error)
            const dbo = db.db(dbName)
            resolve(dbo)
        })
    })
}

function sessionStore() {
    return session({
        secret: DB_SESSION_SALT,
        cookie: { maxAge: 10 * 60 * 1000 },
        resave: false,
        rolling: true,
        saveUninitialized: false,
        unset: 'destroy',
        store: new MongoStore({
            url: url2,
            collection: 'sessions'
        })
    });
}

module.exports = { connect, sessionStore }