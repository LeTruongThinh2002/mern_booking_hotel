import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import myHotelRoutes from './routes/my-hotels';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});

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
app.use('/api/my-hotels', myHotelRoutes);
app.use('/api/my-hotels/add-hotel', myHotelRoutes);
app.use('/api/my-hotels/:hotelId', myHotelRoutes);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(8888, () => {
  console.log('Server running on http://localhost:8888/');
});
