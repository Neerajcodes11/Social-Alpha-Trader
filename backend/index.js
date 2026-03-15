import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock Sentiment API
app.get('/api/sentiment', async (req, res) => {
  try {
    // In the future, this will connect to Ollama: http://localhost:11434
    // For now, returning mock data as requested
    const mockData = [
      { token: 'ETH', sentiment: 'Positive', confidence: 78, mentions: 120, recommendation: 'Enter ETH-USDC pool' },
      { token: 'BTC', sentiment: 'Neutral', confidence: 52, mentions: 450, recommendation: 'Hold' },
      { token: 'SOL', sentiment: 'Positive', confidence: 69, mentions: 85, recommendation: 'Enter SOL-USDC pool' }
    ];
    res.json(mockData);
  } catch (error) {
    console.error('Sentiment API Error:', error);
    res.status(500).json({ error: 'Failed to fetch sentiment' });
  }
});

// Mock StarkZap Trade API
app.post('/api/trade', async (req, res) => {
  try {
    const { token, action } = req.body;
    console.log(`Executing Zap Trade for ${token} (${action})...`);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock success
    res.json({
      success: true,
      message: `Successfully executed Zap Trade for ${token}!`,
      txHash: `0x${Math.random().toString(16).substring(2, 40)}`
    });
  } catch (error) {
    console.error('Trade API Error:', error);
    res.status(500).json({ error: 'Trade execution failed' });
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
