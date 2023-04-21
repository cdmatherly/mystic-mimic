const mongoose = require('mongoose');
const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const pw = process.env.DB_PASSWORD;
// update the "@cluster0.cycjgio.mongodb.net/" with the appropriate address for your mongodb
const uri = `mongodb+srv://${username}:${pw}@CLUSTER_NAME/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri)
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));