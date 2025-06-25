// Express.js server for mg-dashboard (replacing Firebase Functions)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import API routes
import tasksRouter from './api/tasks.js';
import geminiRouter from './api/gemini.js';
import healthRouter from './api/health.js';

// ES module setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.next/static')));

// API Routes
app.use('/api/tasks', tasksRouter);
app.use('/api/gemini', geminiRouter);
app.use('/api/health', healthRouter);

// Simple API-only server - frontend will be served separately
app.get('/', (req, res) => {
  res.json({ 
    message: 'mg-dashboard API server',
    version: '2.0.0',
    endpoints: [
      'GET /api/health',
      'GET /api/tasks',
      'POST /api/tasks',
      'POST /api/gemini'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});