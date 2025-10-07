import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../src/db/db.js';
import routes from './routes/index.js';
dotenv.config();
const app = express();

//database connection
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes connect
app.use('/api', routes);

export default app;
