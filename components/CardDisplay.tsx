import React from 'react';
import { CardTemplate } from '../types';
import { Quote } from 'lucide-react';

interface CardDisplayProps {
  template: CardTemplate;
  message: string;
  senderName: string;
  isViewMode?: boolean;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ template, message, senderName, isViewMode = false }) => {
  const fontFamilyClass = {
    'font-great-vibes': 'font-[Great_Vibes]',
    'font-mountains': 'font-[Mountains_of_Christmas]',
    'font-playfair': 'font-[Playfair_Display]',
    'font-sans': 'font-sans'
  }[template.fontFamily] || 'font-sans';

  return (
    <div 
      className={`relative w-full aspect-[3/4] max-w-md mx-auto shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 ease-out ${template.bgClass} ${template.borderClass || ''} ${isViewMode ? 'scale-100' : 'scale-[0.98] hover:scale-100'}`}
      style={template.bgImage ? { backgroundImage: `url(${template.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Texture Overlay: Gives a slight paper grain feel */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-10" 
           style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}>
      </div>

      {/* Darkening Overlay for readability */}
      {template.overlayClass ? (
        <div className={`absolute inset-0 ${template.overlayClass}`} />
      ) : (
        template.bgImage && <div className="absolute inset-0 bg-black/40" />
      )}
      
      {/* Inner Decorative Frame */}
      <div className="absolute inset-4 border border-white/20 rounded-sm z-20 pointer-events-none"></div>
      <div className="absolute inset-6 border border-white/10 rounded-sm z-20 pointer-events-none"></div>

      <div className="relative h-full flex flex-col justify-between p-8 z-30">
        
        {/* Top Decorative Element */}
        <div className="flex justify-center pt-6">
          <div className={`text-4xl ${template.accentColor} opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] animate-pulse`}>
             ❄
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-grow flex flex-col justify-center items-center text-center space-y-6 px-2">
           <Quote className={`w-6 h-6 ${template.accentColor} opacity-80 rotate-180 drop-shadow-md`} />
           
           <p className={`${fontFamilyClass} ${template.textColor} text-3xl md:text-4xl leading-relaxed drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] whitespace-pre-wrap break-words max-w-full tracking-wide`}>
             {message || "Season's Greetings"}
           </p>
           
           <Quote className={`w-6 h-6 ${template.accentColor} opacity-80 drop-shadow-md`} />
        </div>

        {/* Sender Area */}
        {senderName && (
          <div className="text-center pb-8 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className={`h-[1px] w-8 ${template.accentColor} opacity-50`}></div>
              <p className={`text-xs uppercase tracking-[0.2em] ${template.accentColor} opacity-90 font-bold drop-shadow-md`}>
                Sent with love by
              </p>
              <div className={`h-[1px] w-8 ${template.accentColor} opacity-50`}></div>
            </div>
            <p className={`${fontFamilyClass} ${template.textColor} text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
              {senderName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDisplay;