
import React, { useState } from 'react';
import type { Player } from '../types';
import ScoutReportGenerator from './ScoutReportGenerator';
import { ArrowLeftIcon, ShieldCheckIcon, PresentationChartLineIcon, ExclamationTriangleIcon, BanknotesIcon } from './icons/Icons';

interface PlayerDetailViewProps {
  player: Player;
  onBack: () => void;
  onBuy: (player: Player, amount: number) => void;
}

const StatBox: React.FC<{ icon: React.ReactNode, label: string, value: string | number, colorClass: string }> = ({ icon, label, value, colorClass }) => (
    <div className="bg-background p-4 rounded-lg flex items-center space-x-3">
        <div className={`p-2 rounded-full ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-text-secondary">{label}</p>
            <p className="text-lg font-bold text-text-primary">{value}</p>
        </div>
    </div>
);


const PlayerDetailView: React.FC<PlayerDetailViewProps> = ({ player, onBack, onBuy }) => {
    const [buyAmount, setBuyAmount] = useState(1000000);

    const handleBuy = () => {
        if(buyAmount > 0) {
            onBuy(player, buyAmount);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <button onClick={onBack} className="flex items-center space-x-2 text-primary mb-6 hover:text-primary-dark font-semibold">
                <ArrowLeftIcon />
                <span>Back to Market</span>
            </button>

            <div className="bg-card p-6 rounded-2xl shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Player Info & Image */}
                    <div className="lg:col-span-1 flex flex-col items-center">
                        <img src={player.imageUrl} alt={player.name} className="w-52 h-52 rounded-full object-cover border-4 border-primary shadow-lg mb-4" />
                        <h2 className="text-4xl font-bold text-text-primary">{player.name}</h2>
                        <p className="text-lg text-text-secondary mt-1">{player.club}</p>
                        <p className="text-md text-text-secondary">{player.position} | {player.nationality}</p>
                    </div>

                    {/* Middle Column: Stats & Predictions */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-2xl font-bold border-b-2 border-primary pb-2">Player Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <StatBox icon={<BanknotesIcon />} label="Current Value" value={`€${(player.currentValue / 1_000_000).toFixed(1)}M`} colorClass="bg-green-500/20" />
                           <StatBox icon={<PresentationChartLineIcon />} label="Predicted Value" value={`€${(player.predictedValue / 1_000_000).toFixed(1)}M`} colorClass="bg-emerald-500/20" />
                           <StatBox icon={<ShieldCheckIcon />} label="Potential" value={player.potential} colorClass="bg-blue-500/20" />
                           <StatBox icon={<ExclamationTriangleIcon />} label="Injury Risk" value={`${player.injuryRisk}%`} colorClass="bg-red-500/20" />
                        </div>
                         <div className="bg-background p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Season Stats</h4>
                            <div className="flex justify-around text-center">
                                <div><p className="text-2xl font-bold">{player.stats.appearances}</p><p className="text-sm text-text-secondary">Appearances</p></div>
                                <div><p className="text-2xl font-bold">{player.stats.goals}</p><p className="text-sm text-text-secondary">Goals</p></div>
                                <div><p className="text-2xl font-bold">{player.stats.assists}</p><p className="text-sm text-text-secondary">Assists</p></div>
                            </div>
                        </div>

                        {/* Buy Section */}
                        <div className="bg-background p-4 rounded-lg">
                           <h4 className="font-semibold mb-3 text-lg">Invest in Player</h4>
                           <div className="flex items-center space-x-4">
                               <input 
                                 type="number"
                                 value={buyAmount}
                                 onChange={(e) => setBuyAmount(Number(e.target.value))}
                                 className="flex-grow bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary"
                                 step="100000"
                                 min="0"
                               />
                               <button onClick={handleBuy} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-md transition-colors">
                                 Buy
                               </button>
                           </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Scout Report */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                    <ScoutReportGenerator player={player} />
                </div>
            </div>
        </div>
    );
};

export default PlayerDetailView;
