const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://sportmen:sportmen@localhost:27017/sportcategory";
const url2 = "mongodb+srv://sportmen:turboman54@cluster0-onxaf.mongodb.net/test?retryWrites=true&w=majority"
const db2Name = "categorysport"
function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url2, { useUnifiedTopology: true, useNewUrlParser: true },  (error, db) => {
            if (error) reject(error);
            const dbo = db.db('categorysport');
            console.log(dbo);
            resolve(dbo);
        });
    });
};

module.exports = { connect };