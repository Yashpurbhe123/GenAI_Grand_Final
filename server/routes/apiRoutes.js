
import express from 'express';
import { 
  subscribe, 
  contact, 
  getWelcomeMessage, 
  getDashboardStats,
  getApiKeys,
  createApiKey,
  deleteApiKey,
  getUsageAnalytics,
  getSettings,
  updateSettings,
  analyzeText,
  analyzeImage
} from '../controllers/apiController.js';

const router = express.Router();

// Public Routes
router.get('/welcome', getWelcomeMessage);

// Dashboard Routes
router.get('/dashboard-stats', getDashboardStats);
router.get('/keys', getApiKeys);
router.post('/keys', createApiKey);
router.delete('/keys/:id', deleteApiKey);
router.get('/analytics', getUsageAnalytics);
router.get('/settings', getSettings);
router.post('/settings', updateSettings);

// Action Routes
router.post('/subscribe', subscribe);
router.post('/contact', contact);

// Analysis Routes (Mock AI)
router.post('/analyze-text', analyzeText);
router.post('/analyze-image', analyzeImage);

export default router;
