import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudnary.js';
import userRouter from './routes/userRoutes.js';

const app = express();

await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())
app.use('/api/ai',aiRouter)

app.use('/api/user',userRouter)

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});
app.use(requireAuth());

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
  


