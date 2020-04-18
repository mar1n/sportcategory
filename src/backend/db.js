const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://sportmen:sportmen@localhost:27017/sportcategory";

function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true },  (error, db) => {
            if (error) reject(error);
            const dbo = db.db('sportcategory');
            console.log(dbo);
            resolve(dbo);
        });
    });
};

module.exports = { connect };