// SERVER SIDE.....

const express = require('express')
const http = require('http');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (socket) => {
    console.log("A user connected", socket.id)

    socket.on('msg_send', (data) => {
        console.log(data);

        const messageData = {
            id: socket.id,   // Include the socket ID
            message: data    // Include the original message
        };
        // console.log(messageData); 
        io.emit('msg_rcvd', (data));
    })

})

app.use('/', express.static(__dirname + '/public'))

server.listen(4000, () => {
    console.log("Server Started")
})