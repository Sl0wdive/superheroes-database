import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import superheroRoutes from './routes/superhero.routes';
import fs from 'fs';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4444;

connectDB();

app.use(cors());

const uploadsDir = path.join(__dirname, '../uploads')

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
} 

app.use(express.json());
app.use('/uploads', express.static(uploadsDir));
app.use('/api/superheroes', superheroRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
