
import React from 'react';
import type { Player } from '../types';
import { ArrowTrendingUpIcon, ChartBarIcon } from './icons/Icons';

interface PlayerCardProps {
  player: Player;
  onSelect: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onSelect }) => {
  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      <img className="w-full h-48 object-cover" src={player.imageUrl} alt={player.name} />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-text-primary">{player.name}</h3>
            <span className="text-sm font-semibold text-text-secondary">{player.age} yrs</span>
        </div>
        <p className="text-sm text-text-secondary mb-1">{player.position}</p>
        <p className="text-sm text-text-secondary mb-4">{player.club}</p>
        
        <div className="space-y-3 mb-4 flex-grow">
            <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Current Value</span>
                <span className="font-semibold text-text-primary">€{(player.currentValue / 1_000_000).toFixed(1)}M</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Predicted Value</span>
                <span className="font-semibold text-accent-green">€{(player.predictedValue / 1_000_000).toFixed(1)}M</span>
            </div>
        </div>

        <button 
          onClick={() => onSelect(player)}
          className="w-full mt-auto bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ChartBarIcon />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
