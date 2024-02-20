import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';

//Connect to DB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log('Connect to database: ', process.env.MONGODB_CONNECTION_STRING);
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(8888, () => {
  console.log('Server running on http://localhost:8888/');
});
