import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // Import cors
import { connectDb } from './db/connectDb.js';

import adroutes from './routes/ad.routes.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import auctionRoutes from './routes/auction.route.js';
import userRoutes from "./routes/user.routes.js";
import StoreRoutes from "./routes/store.routes.js";
import lostnfoundRoutes from "./routes/lostnfound.routes.js"

import { io, app, server } from './socket/socket.js';

dotenv.config();
await connectDb();

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials: true,
};

app.use(cors(corsOptions)); 
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/ad/', adroutes);
app.use('/api/message', messageRoutes);
app.use('/api/auction', auctionRoutes);
app.use('/api/store/',StoreRoutes);
app.use('/api/lnf/',lostnfoundRoutes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
