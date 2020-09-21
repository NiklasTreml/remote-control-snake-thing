var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { json } = require('express');
var PORT = 3000

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '\\content\\index.html');
});

app.get('/display', (req, res) => {
    res.sendFile(__dirname + '\\content\\display.html');
});

app.get('/controller', (req, res) => {
    res.sendFile(__dirname + '\\content\\controller.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("controller connect", (e) => {
        console.log("Controller connect")
    })

    socket.on("display connect", (e) => {
        console.log("Display connect")
    })

    socket.on("moveUp", (e) => {
        socket.broadcast.emit("display Up")
        console.log("moveUp")
    })

    socket.on("moveDown", (e) => {
        socket.broadcast.emit("display Down")
        console.log("moveDown")
    })

    socket.on("moveLeft", (e) => {
        socket.broadcast.emit("display Left")
        console.log("moveLeft")
    })

    socket.on("moveRight", (e) => {
        socket.broadcast.emit("display Right")
        console.log("moveRight")
    })

});

/*
on controller tilt forward 
    => emit move up 
    => emit move up to display 
    => on move up execute moveUp() on display side;
        rinse and repeat for other
*/




http.listen(PORT, () => {
    console.log('listening on *:3000');
});