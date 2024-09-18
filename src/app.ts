import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;

// Initialize database and start the server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to initialize the database:', error);
});
