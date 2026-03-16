# Social Alpha Trader 🚀

Social Alpha Trader is an AI-powered DeFi sentiment analysis dashboard. It uses Cloud-based Llama 3 (via Groq) to analyze social sentiment for top tokens and provides one-click trade execution using the **StarkZap SDK**.

## 🌟 Features

- **AI Sentiment Dashboard:** Real-time sentiment analysis (Positive/Neutral/Negative) for ETH, BTC, and SOL.
- **Sentiment Breakdown:** Detailed explanation of market drivers and AI confidence scores.
- **One-Click Zap Trade:** Seamlessly transition from social insight to a StarkZap transaction with a single click.
- **Premium UI:** A modern, glassmorphic dark-mode interface designed for power users.

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, TypeScript.
- **Backend:** Node.js, Express.
- **AI:** Groq SDK (Llama 3 8B model).
- **Blockchain:** StarkZap SDK (Mocked Simulation).

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed.
- A free API Key from [Groq Console](https://console.groq.com/keys).

### 2. Setup
Clone the repository and install dependencies for both the frontend and backend:

```bash
npm install
npm run install-all
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory:

```env
GROQ_API_KEY=your_api_key_here
PORT=3001
```

### 4. Run Locally
Start both the frontend and backend with a single command:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## 📜 Submission Details
This project was built for the StarkZap challenge to demonstrate how social sentiment can be converted into instant liquidity actions via the StarkZap SDK.

---
Built with ❤️ by the Social Alpha Team.
