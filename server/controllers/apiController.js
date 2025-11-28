
import crypto from 'crypto';

// In-memory state
let apiKeys = []; 
let settings = {
  email: '',
  notifications: true,
  plan: 'Enterprise Plan'
};

// Helper to generate random key
const generateKey = () => {
  return 'sk-' + crypto.randomBytes(24).toString('hex');
};

// Helper to calculate dynamic usage per key
const calculateUsage = (startTime) => {
  if (!startTime) return { requests: 0, cost: '0.00' };
  
  const hoursPassed = (Date.now() - new Date(startTime).getTime()) / (1000 * 60 * 60);
  // 1000 requests per hour logic
  const requests = Math.floor(hoursPassed * 1000);
  const cost = (requests * 0.002).toFixed(2); // $0.002 per request
  return { requests, cost };
};

export const subscribe = (req, res) => {
  const { plan } = req.body;
  if (!plan) {
    return res.status(400).json({ success: false, message: 'Plan is required' });
  }
  console.log(`[Subscription] Plan: ${plan}`);
  settings.plan = plan;
  
  setTimeout(() => {
    res.json({ 
      success: true, 
      message: `Successfully subscribed to ${plan}`,
      subscriptionId: `sub_${Math.random().toString(36).substr(2, 9)}`
    });
  }, 500);
};

export const contact = (req, res) => {
  const { plan, email } = req.body;
  console.log(`[Contact] Plan: ${plan}, Email: ${email}`);
  
  setTimeout(() => {
    res.json({ 
      success: true, 
      message: 'We have received your inquiry. Our sales team will contact you shortly.',
      ticketId: `tkt_${Math.random().toString(36).substr(2, 9)}`
    });
  }, 500);
};

export const getWelcomeMessage = (req, res) => {
  res.json({ 
    message: 'Welcome to RealityCheck AI! Explore our features below.',
    version: '1.0.0',
    status: 'operational'
  });
};

export const getDashboardStats = (req, res) => {
  const stats = apiKeys.map(key => {
    const { requests, cost } = calculateUsage(key.usageStartTime);
    const errors = requests > 0 ? (Math.random() * 0.5).toFixed(2) : 0;
    const latency = requests > 0 ? Math.floor(Math.random() * 20) + 30 : 0;
    
    return {
      keyId: key.id,
      keyName: key.name,
      requests: requests,
      errors: parseFloat(errors),
      latency: `${latency}ms`,
      cost: `$${cost}`,
      uptime: '99.99%',
      lastUpdated: new Date().toISOString()
    };
  });
  
  res.json(stats);
};

export const getApiKeys = (req, res) => {
  res.json(apiKeys);
};

export const createApiKey = (req, res) => {
  const { name } = req.body;
  
  const newKey = {
    id: `key_${Math.random().toString(36).substr(2, 9)}`,
    name: name || 'New API Key',
    key: generateKey(),
    created: new Date().toISOString(),
    usageStartTime: new Date().toISOString()
  };
  apiKeys.push(newKey);
  res.json(newKey);
};

export const deleteApiKey = (req, res) => {
  const { id } = req.params;
  apiKeys = apiKeys.filter(k => k.id !== id);
  res.json({ success: true });
};

export const getUsageAnalytics = (req, res) => {
  // Aggregate usage across all keys
  let totalRequests = 0;
  let totalCost = 0;
  let weightedLatency = 0;
  let weightedErrors = 0;

  apiKeys.forEach(key => {
    const { requests, cost } = calculateUsage(key.usageStartTime);
    totalRequests += requests;
    totalCost += parseFloat(cost);
    
    // Simulate latency and errors per key for aggregation
    const keyLatency = requests > 0 ? Math.floor(Math.random() * 20) + 30 : 0;
    const keyErrors = requests > 0 ? (Math.random() * 0.5) : 0;

    weightedLatency += keyLatency * requests;
    weightedErrors += keyErrors * requests;
  });

  const avgLatency = totalRequests > 0 ? Math.round(weightedLatency / totalRequests) : 0;
  const avgErrorRate = totalRequests > 0 ? (weightedErrors / totalRequests).toFixed(2) : 0;

  // Generate historical data points (last 12 hours)
  const hoursToShow = 12;
  const requestsData = [];
  const latencyData = [];
  const errorsData = [];
  const costData = [];

  for (let i = 0; i < hoursToShow; i++) {
    // Distribute total requests somewhat randomly over time
    const factor = (i + 1) / hoursToShow; // Increasing trend
    const hourlyRequests = totalRequests > 0 ? Math.floor((totalRequests / hoursToShow) * (0.5 + Math.random())) : 0;
    
    requestsData.push(hourlyRequests);
    latencyData.push(avgLatency > 0 ? avgLatency + Math.floor(Math.random() * 10 - 5) : 0);
    errorsData.push(avgErrorRate > 0 ? parseFloat((parseFloat(avgErrorRate) + (Math.random() * 0.1 - 0.05)).toFixed(2)) : 0);
    costData.push(totalCost > 0 ? parseFloat((totalCost * factor).toFixed(2)) : 0);
  }

  res.json({
    requests: {
      total: totalRequests.toLocaleString(),
      change: '+12.5%', // Mocked change
      isPositive: true,
      data: requestsData
    },
    latency: {
      avg: `${avgLatency}ms`,
      change: '-5.2%', // Mocked change
      isPositive: true,
      data: latencyData
    },
    errors: {
      rate: `${avgErrorRate}%`,
      change: '+0.02%', // Mocked change
      isPositive: false,
      data: errorsData
    },
    cost: {
      total: `$${totalCost.toFixed(2)}`,
      change: '+8.4%', // Mocked change
      isPositive: false,
      data: costData
    }
  });
};

export const getSettings = (req, res) => {
  res.json(settings);
};

export const updateSettings = (req, res) => {
  settings = { ...settings, ...req.body };
  res.json({ success: true, settings });
};

export const analyzeText = (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ success: false, message: 'Text is required' });
  }

  const isFake = Math.random() > 0.7;
  const confidence = (0.7 + Math.random() * 0.29).toFixed(2);
  
  setTimeout(() => {
    res.json({
      verdict: isFake ? 'POTENTIALLY MISLEADING' : 'LIKELY TRUE',
      confidence: parseFloat(confidence),
      analysis: isFake 
        ? 'Our analysis detected patterns consistent with known misinformation narratives.'
        : 'The content aligns with verified information from multiple credible sources.',
      sources: isFake ? [] : ['Reuters', 'AP News', 'BBC'],
      flags: isFake ? ['Sensationalism', 'Unverified Claims'] : []
    });
  }, 1500);
};

export const analyzeImage = (req, res) => {
  setTimeout(() => {
    res.json({
      verdict: 'AUTHENTIC',
      confidence: 0.92,
      metadata: {
        format: 'JPEG',
        resolution: '1920x1080',
        created: '2023-10-27'
      },
      manipulationScore: 0.05,
      analysis: 'No signs of digital manipulation or deepfake artifacts detected.'
    });
  }, 2000);
};
