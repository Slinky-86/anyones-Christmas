import React, { useState } from 'react';
import { Wand2, Sparkles, X, Snowflake } from 'lucide-react';
import { generateGreeting } from '../services/geminiService';

interface AIWriterProps {
  onGenerate: (text: string) => void;
}

const AIWriter: React.FC<AIWriterProps> = ({ onGenerate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [tone, setTone] = useState('Warm');

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const text = await generateGreeting(recipient, tone, 'friend/family');
      onGenerate(text);
      setIsOpen(false); 
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mt-3 group flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
      >
        <Sparkles size={14} className="group-hover:animate-spin-slow" />
        Use AI Assistant
      </button>
    );
  }

  return (
    <div className="mt-4 p-5 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl border border-amber-500/30 shadow-xl shadow-black/20 animate-in fade-in slide-in-from-top-4 ring-1 ring-white/5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-amber-100 flex items-center gap-2">
          <Wand2 size={14} className="text-amber-400" />
          Magic Writer
        </h4>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Who is this for?</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="e.g. Grandma, Best Friend, Coworker"
            className="w-full bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder-slate-600"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Tone</label>
          <div className="flex gap-2">
            {['Warm', 'Funny', 'Formal'].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`flex-1 text-xs py-2 px-2 rounded-lg transition-all border font-medium ${
                  tone === t 
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.2)]' 
                    : 'bg-black/20 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full relative overflow-hidden group flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-all shadow-lg shadow-amber-900/40 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
        >
          {/* Shine effect */}
          <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
          
          {isLoading ? <Snowflake className="animate-spin" size={16} /> : <Sparkles size={16} />}
          {isLoading ? 'Crafting Message...' : 'Generate Greeting'}
        </button>
      </div>
    </div>
  );
};

export default AIWriter;