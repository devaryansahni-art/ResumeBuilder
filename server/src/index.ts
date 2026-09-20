import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resumes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'CraftCV API Server is online' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 CraftCV Server running on http://localhost:${PORT}`);
});
