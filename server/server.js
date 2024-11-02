import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { connectDb } from './db/connectDb.js';
import adroutes from './routes/ad.routes.js';
import authRoutes from './routes/auth.route.js';
dotenv.config();
await connectDb();


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/ad', adroutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
