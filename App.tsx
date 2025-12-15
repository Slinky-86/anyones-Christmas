import React, { useState, useEffect } from 'react';
import { CARD_TEMPLATES, DEFAULT_MESSAGE, DEFAULT_SENDER } from './constants';
import { CardTemplate, AppMode } from './types';
import Snowfall from './components/Snowfall';
import CardDisplay from './components/CardDisplay';
import QuickGreetings from './components/QuickGreetings';
import { Share2, PenTool, Check, Copy, Gift, ChevronRight, Snowflake, ArrowLeft } from 'lucide-react';

// Simple URL encoder/decoder helpers
const encodeState = (templateId: string, message: string, sender: string) => {
  const params = new URLSearchParams();
  params.set('t', templateId);
  params.set('m', btoa(unescape(encodeURIComponent(message))));
  params.set('s', btoa(unescape(encodeURIComponent(sender))));
  return params.toString();
};

const decodeState = (params: URLSearchParams) => {
  const tId = params.get('t');
  let msg = DEFAULT_MESSAGE;
  let sender = DEFAULT_SENDER;

  try {
    if (params.has('m')) msg = decodeURIComponent(escape(atob(params.get('m')!)));
    if (params.has('s')) sender = decodeURIComponent(escape(atob(params.get('s')!)));
  } catch (e) {
    console.error("Failed to decode params", e);
    if (params.has('m')) msg = params.get('m')!;
    if (params.has('s')) sender = params.get('s')!;
  }
  return { tId, msg, sender };
};

const App: React.FC = () => {
  // Application State
  const [mode, setMode] = useState<AppMode>(AppMode.CREATE);
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>(CARD_TEMPLATES[0]);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [senderName, setSenderName] = useState(DEFAULT_SENDER);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initialize from URL on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove '#'
    const params = new URLSearchParams(hash);
    
    if (params.has('t')) {
      const { tId, msg, sender } = decodeState(params);
      const foundTemplate = CARD_TEMPLATES.find(t => t.id === tId);
      
      if (foundTemplate) {
        setSelectedTemplate(foundTemplate);
        setMessage(msg);
        setSenderName(sender);
        setMode(AppMode.VIEW);
      }
    }
  }, []);

  const handleShare = async () => {
    const params = encodeState(selectedTemplate.id, message, senderName);
    const url = `${window.location.origin}${window.location.pathname}#${params}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'A Festive Greeting For You',
          text: `You've received a special Christmas card from ${senderName || 'a friend'}!`,
          url: url
        });
      } catch (err) {
        console.log('Share cancelled or failed', err);
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    const params = encodeState(selectedTemplate.id, message, senderName);
    const url = `${window.location.origin}${window.location.pathname}#${params}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetToCreate = () => {
    setMode(AppMode.CREATE);
    window.location.hash = '';
    setIsEnvelopeOpen(false);
  };

  // --- View Mode (Receiver) ---
  if (mode === AppMode.VIEW) {
    if (!isEnvelopeOpen) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black relative overflow-hidden">
          <Snowfall />
          <div 
            className="z-10 flex flex-col items-center cursor-pointer group perspective-1000"
            onClick={() => setIsEnvelopeOpen(true)}
          >
             {/* Enhanced Envelope Design */}
             <div className="relative w-80 h-52 bg-gradient-to-b from-red-700 to-red-900 rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-1 animate-float">
                
                {/* Envelope Flap */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[160px] border-l-transparent border-t-[110px] border-t-red-800/80 border-r-[160px] border-r-transparent drop-shadow-md z-20 origin-top transition-transform duration-700 group-hover:rotate-x-180"></div>
                </div>

                {/* Wax Seal */}
                <div className="absolute top-16 z-30 w-12 h-12 bg-amber-500 rounded-full shadow-lg flex items-center justify-center border-4 border-amber-600/50 group-hover:scale-110 transition-transform">
                  <Snowflake size={24} className="text-amber-900" />
                </div>
                
                {/* Stamps & Postmarks */}
                <div className="absolute top-4 right-4 w-12 h-14 bg-white/90 shadow-sm rotate-3 flex flex-col items-center justify-center p-1 border-2 border-dashed border-slate-300">
                  <div className="w-full h-full bg-slate-200 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1544967082-d9d3f4266381?w=100&q=50" className="object-cover w-full h-full opacity-80" alt="stamp" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-6 text-white/50 font-great-vibes text-xl rotate-[-5deg]">
                  Special Delivery
                </div>
             </div>

             <div className="mt-12 text-center space-y-2">
               <h2 className="text-3xl font-mountains text-amber-100 animate-pulse">You've got a card!</h2>
               <p className="text-slate-400 text-sm">Tap the envelope to open your greeting from {senderName || 'a friend'}</p>
             </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black relative">
        <Snowfall />
        
        <div className="z-10 w-full max-w-md animate-in zoom-in-95 duration-1000 fade-in slide-in-from-bottom-10">
          <CardDisplay 
            template={selectedTemplate} 
            message={message} 
            senderName={senderName} 
            isViewMode={true}
          />
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
             <button 
               onClick={resetToCreate}
               className="bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 group hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
             >
               <PenTool size={18} className="text-amber-400" />
               Make Your Own
               <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform opacity-50" />
             </button>
             
             {senderName && (
               <div className="text-slate-500 text-sm font-medium flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full border border-white/5">
                 <Check size={14} className="text-emerald-500" />
                 Sent by {senderName}
               </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  // --- Create Mode (Sender) ---
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans overflow-hidden">
      <Snowfall />
      
      {/* Left Panel: Preview Stage */}
      <div className="flex-1 min-h-[50vh] lg:h-screen relative flex items-center justify-center p-6 lg:p-12 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black order-1 lg:order-1">
         {/* Background Decoration */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"></div>
         
         <div className="w-full max-w-md relative z-10 transition-transform duration-500 ease-out hover:scale-[1.02]">
            {/* Mobile Header hidden on LG */}
            <div className="lg:hidden text-center mb-6 animate-fade-in-down">
               <h1 className="text-3xl font-bold text-amber-100 font-mountains tracking-wider drop-shadow-lg">
                 Festive Greetings
               </h1>
            </div>

            <CardDisplay 
              template={selectedTemplate} 
              message={message} 
              senderName={senderName} 
            />

            <p className="mt-6 text-center text-slate-500 text-sm lg:hidden flex items-center justify-center gap-1">
              <ArrowLeft size={14} /> Scroll down to edit
            </p>
         </div>
      </div>

      {/* Right Panel: Controls / Editor */}
      <div className="w-full lg:w-[480px] bg-slate-900/95 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col h-auto lg:h-screen z-20 order-2 lg:order-2 shadow-2xl relative">
        
        {/* Desktop Header */}
        <header className="hidden lg:block p-8 pb-4 border-b border-white/5">
           <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 font-mountains tracking-wider flex items-center gap-3 drop-shadow-sm">
             <Gift className="text-red-500 drop-shadow-lg" size={32} /> 
             Festive Greetings
           </h1>
           <p className="text-slate-400 text-sm mt-3 font-medium leading-relaxed">
             Craft a beautiful digital card in seconds. Choose a theme, personalize your message, and share the holiday joy.
           </p>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-10 custom-scrollbar">
          
          {/* Template Selection */}
          <section className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/80 mb-5 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-amber-500/50"></span>
              Select Theme
              <span className="w-8 h-[1px] bg-amber-500/50"></span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {CARD_TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t)}
                  className={`group relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedTemplate.id === t.id 
                      ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 shadow-[0_0_20px_rgba(251,191,36,0.2)]' 
                      : 'hover:ring-2 hover:ring-white/20 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className={`w-full h-full ${t.bgClass} transition-transform duration-700 group-hover:scale-110 bg-cover bg-center`} 
                       style={t.bgImage ? {backgroundImage: `url(${t.bgImage})`} : {}}>
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                  
                  {selectedTemplate.id === t.id && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-slate-900 rounded-full p-1 shadow-lg animate-in zoom-in">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                  
                  <span className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white drop-shadow-md truncate">
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Editor */}
          <section className="animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
             <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/80 mb-5 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-amber-500/50"></span>
              Personalize
              <span className="w-8 h-[1px] bg-amber-500/50"></span>
            </h3>
            
            <div className="space-y-6">
              <div className="group">
                <label className="block text-xs font-medium text-slate-300 mb-2 group-focus-within:text-amber-400 transition-colors">
                  Your Message <span className="text-slate-500 ml-1">({500 - message.length} chars left)</span>
                </label>
                <textarea
                  value={message}
                  maxLength={500}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 resize-none font-medium leading-relaxed transition-all shadow-inner placeholder-slate-600"
                  placeholder="Write your heartfelt greeting here..."
                />
                <QuickGreetings currentMessage={message} onSelect={(text) => setMessage(text)} />
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-slate-300 mb-2 group-focus-within:text-amber-400 transition-colors">From</label>
                <div className="relative">
                  <input
                    type="text"
                    value={senderName}
                    maxLength={50}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-inner placeholder-slate-600"
                    placeholder="Your Name"
                  />
                  <div className="absolute right-3 top-3 text-slate-500 pointer-events-none">
                    <PenTool size={16} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-6 lg:p-8 bg-slate-900 border-t border-white/5 sticky bottom-0 z-30">
          <button
            onClick={handleShare}
            className="w-full relative overflow-hidden group bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-4 rounded-xl shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)] flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Glossy effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine transition-all duration-1000"></div>
            
            <Share2 className="drop-shadow-md" />
            <span className="drop-shadow-md tracking-wide">Share Holiday Cheer</span>
          </button>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <ChevronRight className="rotate-90" />
              </button>

              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mb-5 text-white shadow-lg shadow-amber-500/20">
                  <Gift size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-mountains tracking-wide">Ready to Send!</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Your card is wrapped and ready. Copy the link below to send it via message, email, or social media.</p>
              </div>
              
              <div className="flex items-center gap-2 bg-black/50 p-4 rounded-xl border border-slate-800 mb-6 group focus-within:border-amber-500/50 transition-colors">
                 <input 
                   readOnly 
                   value={`${window.location.origin}${window.location.pathname}#${encodeState(selectedTemplate.id, message, senderName)}`}
                   className="bg-transparent text-slate-300 text-sm w-full focus:outline-none font-mono"
                 />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={copyToClipboard}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-900/20 active:translate-y-0.5"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full bg-transparent hover:bg-white/5 text-slate-400 hover:text-white py-3.5 rounded-xl transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;