import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

app.use(cors());
app.use(express.json());

// Sentiment API using Groq (Cloud AI)
app.get('/api/sentiment', async (req, res) => {
  try {
    if (!groq) {
      console.warn('GROQ_API_KEY missing. Returning mock data.');
      return res.json([
        { token: 'ETH', sentiment: 'Positive', confidence: 78, mentions: 120, recommendation: 'Enter ETH-USDC pool' },
        { token: 'BTC', sentiment: 'Neutral', confidence: 52, mentions: 450, recommendation: 'Hold' },
        { token: 'SOL', sentiment: 'Positive', confidence: 69, mentions: 85, recommendation: 'Enter SOL-USDC pool' }
      ]);
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a crypto sentiment analyzer. Output only a JSON array of objects for tokens ETH, BTC, and SOL. Each object must have fields: token (string), sentiment (Positive/Neutral/Negative), confidence (number 0-100), mentions (estimated number), and recommendation (short DeFi action like "Swap for ETH" or "Add to ETH-USDC LP").'
        },
        {
          role: 'user',
          content: 'Analyze current market sentiment for ETH, BTC, and SOL based on general social trends.'
        }
      ],
      model: 'llama3-8b-8192',
      response_format: { type: 'json_object' }
    });

    const responseContent = JSON.parse(completion.choices[0].message.content);
    // Support either a direct array or a wrapper object containing an array
    const data = Array.isArray(responseContent) ? responseContent : (responseContent.tokens || responseContent.data || Object.values(responseContent)[0]);

    res.json(data);
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Failed to fetch sentiment from Cloud AI' });
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
