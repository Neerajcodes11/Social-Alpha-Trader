'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface TokenData {
  token: string;
  sentiment: string;
  confidence: number;
  mentions: number;
  recommendation: string;
}

export default function Home() {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3001/api/sentiment')
      .then((res) => res.json())
      .then((data) => {
        setTokens(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Social Alpha Trader</h1>
          <p className="text-zinc-400 text-lg">AI-powered crypto sentiment. Executed via StarkZap.</p>
        </div>
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Live Analysis</span>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((item) => (
            <div key={item.token} className="glass p-6 glass-hover group">
              <div className="flex justify-between items-start mb-4">
                <Link href={`/token/${item.token}`} className="hover:text-blue-400 transition-colors">
                  <h2 className="text-2xl font-bold underline decoration-white/10">{item.token}</h2>
                </Link>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  item.sentiment === 'Positive' ? 'bg-green-500/20 text-green-400' : 
                  item.sentiment === 'Negative' ? 'bg-red-500/20 text-red-400' : 'bg-zinc-500/20 text-zinc-400'
                }`}>
                  {item.sentiment}
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">Confidence</span>
                    <span className="font-medium">{item.confidence}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${item.confidence}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm border-t border-white/5 pt-3">
                  <span className="text-zinc-400">Social Mentions</span>
                  <span>{item.mentions}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10 mb-6 group-hover:bg-blue-500/10 transition-colors">
                <p className="text-xs text-blue-400 uppercase font-bold tracking-widest mb-1">Recommendation</p>
                <p className="text-sm font-medium">{item.recommendation}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/trade/${item.token}`)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    item.sentiment === 'Positive' 
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                >
                  Zap Trade
                </button>
                <Link 
                  href={`/token/${item.token}`}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="mt-20 text-center text-zinc-500 text-sm">
        <p>&copy; 2026 Social Alpha Trader • Powered by Groq Llama 3 & StarkZap</p>
      </footer>
    </main>
  );
}
