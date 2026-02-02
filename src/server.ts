import dotenv from 'dotenv';
import { env } from '@config/env';
import { connectDB } from '@config/db';
import app from './app';

dotenv.config();

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
}


startServer();
