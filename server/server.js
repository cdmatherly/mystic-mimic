const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cookieParser = require('cookie-parser')
require('./config/mongoose.config');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// require('./routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );