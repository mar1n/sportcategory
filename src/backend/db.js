require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const url2 = process.env.NODE_ENV === 'development' ? process.env.DB_URL_DEV : process.env.DB_URL_PRD;
const dbName = process.env.NODE_ENV === 'development' ? 'sportcategory' : 'categorysport';

function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url2, { useUnifiedTopology: true, useNewUrlParser: true },  (error, db) => {
            if (error) reject(error);
            const dbo = db.db(dbName);
            console.log(dbo);
            resolve(dbo);
        });
    });
};

module.exports = { connect };