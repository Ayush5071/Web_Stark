import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import { connectDb } from './db/connectDb.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDb();


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
