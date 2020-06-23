const express = require('express');
const app = express();
const cors = require('cors');

// ============================================================= //
// ==================== Setup HTTP Server ====================== //
const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => {
    console.log('listening on 7000');
});
// ===== Socket Server listen to express server ===== //
const io = require('socket.io')(server);

// ===== Enables CORS ===== //
app.use(cors());

// ===== socket.io ===== //
const connectedSockets = new Set();

io.on('connection', (socket) => {
    connectedSockets.add(socket);
    console.log('socket has connected');

    // ===== SIMPLE LISTENER ===== //
    socket.on('log', (msg) => {
        console.log(msg);

        io.emit('log from server', msg);
    });

    socket.on('disconnect', () => {
        socket.close();
    });
});
