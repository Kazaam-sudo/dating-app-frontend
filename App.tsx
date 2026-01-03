import React, { useEffect, useState, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import SelectionCard from './components/SelectionCard';
import { Gender, UserSelection } from './types';

const STORAGE_KEY = 'dating_app_preferences';

const App: React.FC = () => {
  const [selection, setSelection] = useState<UserSelection>({
    me: null,
    looking_for: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize WebApp and load data
  useEffect(() => {
    // Expand the WebApp to full height
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      // Set header color to match background
      if (window.Telegram.WebApp.setHeaderColor) {
        window.Telegram.WebApp.setHeaderColor('secondary_bg_color');
      }
    }

    // Load saved preferences
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSelection(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load preferences", e);
    }
  }, []);

  // Save to localStorage whenever selection changes
  useEffect(() => {
    if (selection.me || selection.looking_for) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    }
  }, [selection]);

  const handleMeChange = (val: Gender) => {
    setSelection(prev => ({ ...prev, me: val }));
    setError(null);
  };

  const handleLookingChange = (val: Gender) => {
    setSelection(prev => ({ ...prev, looking_for: val }));
    setError(null);
  };

  const handleSubmit = useCallback(() => {
    if (!selection.me || !selection.looking_for) {
      setError("Пожалуйста, выберите оба пункта");
      
      // Haptic feedback for error
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
      }
      return;
    }

    setIsSubmitting(true);

    // Haptic feedback for success
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }

    const dataToSend = JSON.stringify({
      me: selection.me,
      looking_for: selection.looking_for
    });

    // Small delay to show animation before closing
    setTimeout(() => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.sendData(dataToSend);
      } else {
        // Fallback for browser testing
        console.log("WebApp.sendData called with:", dataToSend);
        alert(`Data sent to bot: ${dataToSend}`);
        setIsSubmitting(false);
      }
    }, 300);
  }, [selection]);

  return (
    <div className="min-h-screen w-full flex flex-col p-6 relative overflow-hidden bg-[var(--tg-theme-bg-color,#17212b)] text-[var(--tg-theme-text-color,#ffffff)]">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-violet-600/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <header className="mb-8 mt-4 flex items-center gap-3 z-10">
        <div className="bg-violet-500 p-2 rounded-xl neon-shadow">
          <Sparkles size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Dating App</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col z-10">
        
        <SelectionCard 
          title="Кто ты?" 
          value={selection.me} 
          onChange={handleMeChange} 
          type="me"
        />

        <SelectionCard 
          title="Кого ищем?" 
          value={selection.looking_for} 
          onChange={handleLookingChange} 
          type="looking_for"
        />

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

      </main>

      {/* Footer Action */}
      <footer className="mt-auto pt-6 pb-4 sticky bottom-0 z-20">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`
            w-full py-4 px-6 rounded-2xl font-bold text-lg tracking-wide flex items-center justify-center gap-3
            transition-all duration-300 transform shadow-lg
            ${isSubmitting ? 'scale-95 opacity-80' : 'hover:scale-[1.02] active:scale-95'}
            bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white neon-shadow
          `}
        >
          {isSubmitting ? (
            <span>ОТПРАВКА...</span>
          ) : (
            <>
              <Heart className="fill-current" size={24} />
              🚀 НАЙТИ ПАРУ
            </>
          )}
        </button>
      </footer>
    </div>
  );
};

export default App;