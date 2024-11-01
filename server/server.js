import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

import { connectDb } from './db/connectDb.js';
import cookieParser from 'cookie-parser';

import { app, server } from "./socket/socket.js";

dotenv.config();
connectDb();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use("/api/message",messageRoutes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
