import React from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { PREMADE_GREETINGS } from '../constants';

interface QuickGreetingsProps {
  currentMessage: string;
  onSelect: (text: string) => void;
}

const QuickGreetings: React.FC<QuickGreetingsProps> = ({ currentMessage, onSelect }) => {
  const handleShuffle = () => {
    // Pick a random greeting different from current one
    const options = PREMADE_GREETINGS.filter(msg => msg !== currentMessage);
    const randomMsg = options[Math.floor(Math.random() * options.length)];
    onSelect(randomMsg);
  };

  return (
    <button
      onClick={handleShuffle}
      className="mt-3 group flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider bg-transparent hover:bg-white/5 px-3 py-2 rounded-lg"
    >
      <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
      <span className="flex items-center gap-1">
         Shuffle Message <Sparkles size={10} className="text-amber-200" />
      </span>
    </button>
  );
};

export default QuickGreetings;