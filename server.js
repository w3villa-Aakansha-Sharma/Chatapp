// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO connection event
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Broadcast the message to all clients when received
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
