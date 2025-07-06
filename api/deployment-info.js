// Endpoint to show deployment information
import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const router = express.Router();
const execAsync = promisify(exec);

// GET /api/deployment-info - Show deployment details
router.get('/', async (req, res) => {
  try {
    const info = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      node_version: process.version,
      render_service_name: process.env.RENDER_SERVICE_NAME,
      render_git_commit: process.env.RENDER_GIT_COMMIT,
      features: {
        calendar: false,  // Check if calendar code exists
        ai_assistant: false,  // Check if AI code exists
        google_drive: false,  // Check if Google Drive is configured
        database: false  // Check if database is connected
      }
    };

    // Check for calendar integration
    try {
      const fs = await import('fs');
      // Look for calendar-related files or config
      info.features.calendar = false; // Update based on actual check
    } catch (e) {}

    // Check for AI assistant
    if (process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY) {
      info.features.ai_assistant = true;
    }

    // Check for Google Drive
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
      info.features.google_drive = true;
    }

    // Check database
    try {
      const { healthCheck } = await import('../lib/database.js');
      const health = await healthCheck();
      info.features.database = health.database === 'connected';
    } catch (e) {}

    // Try to get git info
    try {
      const { stdout: gitCommit } = await execAsync('git rev-parse HEAD');
      const { stdout: gitBranch } = await execAsync('git rev-parse --abbrev-ref HEAD');
      info.git = {
        commit: gitCommit.trim(),
        branch: gitBranch.trim()
      };
    } catch (e) {}

    res.json(info);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get deployment info',
      message: error.message 
    });
  }
});

export default router;