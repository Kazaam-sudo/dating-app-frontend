import React from 'react';
import { User, Heart } from 'lucide-react';
import { Gender } from '../types';

interface SelectionCardProps {
  title: string;
  value: Gender | null;
  onChange: (value: Gender) => void;
  type: 'me' | 'looking_for';
}

const SelectionCard: React.FC<SelectionCardProps> = ({ title, value, onChange, type }) => {
  return (
    <div className="w-full mb-8 animate-fade-in-up">
      <h2 className="text-lg font-semibold mb-4 text-[var(--tg-theme-text-color,#fff)] opacity-80 pl-1">
        {title}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Male Option */}
        <button
          onClick={() => onChange('male')}
          className={`
            relative overflow-hidden rounded-2xl p-6 flex flex-col items-center justify-center gap-3
            transition-all duration-300 transform active:scale-95 border
            ${value === 'male' 
              ? 'bg-violet-600/20 border-violet-500 neon-shadow' 
              : 'bg-[var(--tg-theme-secondary-bg-color,#242f3d)] border-transparent opacity-60 hover:opacity-80'
            }
          `}
        >
          <div className={`
            p-3 rounded-full transition-colors duration-300
            ${value === 'male' ? 'bg-violet-500 text-white' : 'bg-gray-700/50 text-gray-400'}
          `}>
            <User size={32} />
          </div>
          <span className={`font-medium ${value === 'male' ? 'text-violet-300' : 'text-gray-400'}`}>
            Парень
          </span>
        </button>

        {/* Female Option */}
        <button
          onClick={() => onChange('female')}
          className={`
            relative overflow-hidden rounded-2xl p-6 flex flex-col items-center justify-center gap-3
            transition-all duration-300 transform active:scale-95 border
            ${value === 'female' 
              ? 'bg-violet-600/20 border-violet-500 neon-shadow' 
              : 'bg-[var(--tg-theme-secondary-bg-color,#242f3d)] border-transparent opacity-60 hover:opacity-80'
            }
          `}
        >
          <div className={`
            p-3 rounded-full transition-colors duration-300
            ${value === 'female' ? 'bg-violet-500 text-white' : 'bg-gray-700/50 text-gray-400'}
          `}>
            {/* Using Heart for female just to distinguish visually, or User with style */}
            <User size={32} /> 
          </div>
          <span className={`font-medium ${value === 'female' ? 'text-violet-300' : 'text-gray-400'}`}>
            Девушка
          </span>
        </button>
      </div>
    </div>
  );
};

export default SelectionCard;