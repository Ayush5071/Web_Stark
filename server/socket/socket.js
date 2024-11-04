import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

// CORS configuration for Socket.IO
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Allow requests from any origin
        methods: ['GET', 'POST'],
        credentials: true, // Allow credentials (cookies)
    },
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
    console.log("A user connected:", socket.id);
    
    const userId = socket.handshake.query.userId; // Get userId from query
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }
    
    // Emit the list of online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        const userId = Object.keys(userSocketMap).find(id => userSocketMap[id] === socket.id);
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };
