const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cookieParser = require('cookie-parser')
const mongoose = require('./config/mongoose.config');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

require('./routes/user.routes')(app);
require('./routes/character.routes')(app);
require('./routes/campaign.routes')(app);
    
app.get('/', (req, res) => {
    return res.send('Hello')
})


app.listen(port, () => console.log(`Listening on port: ${port}`) );