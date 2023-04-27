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


const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );
// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, {cors: true})

io.on("connection", socket => {
    //NOTE: Each client that connects gets their own socket id
    console.log("User Connected", socket.id)

    socket.on("join_room", (campaign_id) => {
        socket.join(campaign_id)
        console.log(`User ${socket.id} joined room ${campaign_id}`)
    })

    socket.on('send_message', (data) => {
        console.log(data)
        socket.to(1).emit('receive_message', data)
    })
    

    socket.on("event_from_client", data => {
        //socket.broadcast will emit to all other clients besides the client who is actually emitting
        socket.broadcast.emit("send_data_to_all_other_clients", data)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})