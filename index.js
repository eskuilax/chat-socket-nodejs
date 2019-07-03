const express = require('express');
const app = express();

const path = require('path');

//config
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

const server= app.listen(app.get('port'), ()=>{
    console.log('Server started on port', app.get('port'));
});



//socket
const socketIO = require('socket.io');
const io  = socketIO(server);

io.on("connection", (socket)=>{
    console.log("new conection", socket.id);

socket.on('chat:message', (data)=>{
    console.log(data);
    io.sockets.emit('chat:message', data);
});

socket.on('chat:typing', (data)=>{
    socket.broadcast.emit('chat:typing', data);
})


});  