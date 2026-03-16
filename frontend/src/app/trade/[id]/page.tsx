'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function TransactionPage() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const [txHash, setTxHash] = useState('');

  const executeTrade = async () => {
    setStatus('PROCESSING');
    try {
      const response = await fetch('http://localhost:3001/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: params.id, action: 'ZAP_TRADE' }),
      });
      const data = await response.json();
      setTxHash(data.txHash);
      setStatus('SUCCESS');
    } catch (err) {
      console.error(err);
      setStatus('IDLE');
      alert('Transaction failed');
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 h-screen flex flex-col justify-center">
      <div className="glass p-10 text-center relative overflow-hidden">
        {status === 'IDLE' && (
          <>
            <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-lg text-sm">
              Confirming transaction for StarkZap liquidity entry.
            </div>
            <h1 className="text-3xl font-bold mb-4">Execute {params.id} Zap</h1>
            <p className="text-zinc-400 mb-10">You are about to enter a liquidity pool using StarkZap's one-click functionality.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => router.back()}
                className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button 
                onClick={executeTrade}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/40"
              >
                Confirm Zap
              </button>
            </div>
          </>
        )}

        {status === 'PROCESSING' && (
          <div className="py-10">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-2">Simulating StarkZap SDK...</h2>
            <p className="text-zinc-500">Signing transaction and broadcasting to Starknet.</p>
          </div>
        )}

        {status === 'SUCCESS' && (
          <div className="py-10 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2">Transaction Successful</h2>
            <p className="text-zinc-400 mb-8 font-mono text-xs break-all px-4">Hash: {txHash}</p>
            <button 
              onClick={() => router.push('/')}
              className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
