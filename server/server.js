const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

require('./server/routes/????.routes')(app);
app.listen(port, () => console.log(`Listening on port: ${port}`) );