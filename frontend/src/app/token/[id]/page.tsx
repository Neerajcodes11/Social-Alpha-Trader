'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface TokenData {
  token: string;
  sentiment: string;
  confidence: number;
  mentions: number;
  recommendation: string;
  explanation?: string;
}

export default function TokenDetails() {
  const params = useParams();
  const router = useRouter();
  const [token, setToken] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/sentiment')
      .then((res) => res.json())
      .then((data: TokenData[]) => {
        const found = data.find(t => t.token.toLowerCase() === (params.id as string).toLowerCase());
        setToken(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="p-20 text-center text-zinc-500">Loading analysis...</div>;
  if (!token) return <div className="p-20 text-center">Token not found. <button onClick={() => router.back()} className="text-blue-500 underline ml-2">Go back</button></div>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <button
        onClick={() => router.back()}
        className="mb-8 text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
      >
        ← Back to Dashboard
      </button>

      <div className="glass p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold mb-2">{token.token} Detail Analysis</h1>
            <p className="text-zinc-400">Deep-dive into social sentiment metrics</p>
          </div>
          <div className={`px-6 py-2 rounded-full text-lg font-bold uppercase tracking-widest ${token.sentiment === 'Positive' ? 'bg-green-500/20 text-green-400' : 'bg-zinc-500/20 text-zinc-400'
            }`}>
            {token.sentiment}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-white/5 pb-2">Sentiment Drivers</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-sm text-zinc-500 mb-1">Social Volume</p>
                <p className="text-2xl font-bold">{token.mentions} <span className="text-sm font-normal text-zinc-500 underline">Significant Mentions</span></p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-sm text-zinc-500 mb-1">AI Confidence Score</p>
                <p className="text-2xl font-bold">{token.confidence}%</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-white/5 pb-2">StarkZap Opportunity</h2>
            <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
              <p className="text-blue-400 text-xs uppercase font-bold mb-2">Alpha Signal</p>
              <p className="text-xl font-medium mb-6 italic">"{token.recommendation}"</p>
              <button
                onClick={() => router.push(`/trade/${token.token}`)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-900/40"
              >
                Execute Zap Trade
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
          <h3 className="text-sm font-bold uppercase text-zinc-500 mb-4">Sentiment Breakdown</h3>
          <p className="text-zinc-300 leading-relaxed">
            Market chatter regarding {token.token} is currently driven by high engagement across decentralized social protocols.
            The AI sentiment analysis indicates structured accumulation behavior versus speculative retail churn.
            Recommend {token.recommendation} to capture immediate liquidity premiums.
          </p>
        </div>
      </div>
    </main>
  );
}
