const express = require('express');
const app = express();
const cors = require('cors');

// ============================================================= //
// ==================== Setup HTTP Server ====================== //
const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => {
    console.log('listening on 7000');
});

const io = require('socket.io')(server);

// ===== Enables CORS ===== //
app.use(cors());

// ===== socket.io ===== //
const connectedSockets = new Set();

io.on('connection', (socket) => {
    connectedSockets.add(socket);
    console.log('socket has connected');

    console.log(socket.id);

    // ===== SIMPLE LISTENER ===== //
    socket.on('log', (msg) => {
        console.log(msg);

        io.emit('log from server', msg);
    });

    // ===== SINGLE LISTENER ===== //

    socket.on('count to server', (count) => {
        io.emit('count to clients', count);
        console.log(count);
    });

    // ===== MULTI LISTENER ===== //

    socket.on('mCount 0 to server', (count) => {
        // console.log(count);

        io.emit('mCount 0 to clients', count);
    });
    socket.on('mCount 1 to server', (count) => {
        // console.log(count);

        io.emit('mCount 1 to clients', count);
    });

    // ======================================================= //

    const interator = connectedSockets.values();
    let allSocketIds = [];
    for (let value of interator) {
        allSocketIds.push(value.id);
    }

    io.emit('number of sockets', allSocketIds.length);
    console.log(allSocketIds.length, 'length');

    socket.on('disconnect', () => {
        connectedSockets.delete(socket);
        socket.leave('/');
        console.log('socket has disconnected');
    });
});
