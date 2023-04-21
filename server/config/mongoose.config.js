const mongoose = require('mongoose');
const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const pw = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${pw}@cluster0.pgqml6j.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri)
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));