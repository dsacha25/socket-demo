const express = require('express');
const app = express();
const cors = require('cors');

// ============================================================= //
// ==================== Setup HTTP Server ====================== //
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log('listening on 8000');
});
// ===== Socket Server listen to express server ===== //
const io = require('socket.io')(server);

// ===== Enables CORS ===== //
app.use(cors());
/* 
    app.all('*', function (req, res, next) {
        var origin = req.get('origin');
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
});
 */

// ===== socket.io ===== //
const connectedSockets = new Set();

io.on('connection', (socket) => {
    connectedSockets.add(socket);
    console.log('socket has connected');

    // ===== SIMPLE LISTENER ===== //
    socket.on('log', (serverMsg) => {
        console.log(serverMsg);

        io.emit('log from server', serverMsg);
    });

    socket.on('disconnect', () => {
        socket.close();
    });
});
