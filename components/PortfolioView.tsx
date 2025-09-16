
import React, { useMemo } from 'react';
import type { PortfolioItem, Player } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PortfolioViewProps {
  portfolio: PortfolioItem[];
  allPlayers: Player[];
  sellPlayer: (playerId: number) => void;
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ portfolio, allPlayers, sellPlayer }) => {
  const portfolioWithDetails = useMemo(() => {
    return portfolio.map(item => {
      const player = allPlayers.find(p => p.id === item.playerId);
      if (!player) return null;
      
      const currentValue = player.currentValue;
      const profitLoss = currentValue - item.purchasePrice;
      const profitLossPercent = (profitLoss / item.purchasePrice) * 100;
      
      return {
        ...player,
        purchasePrice: item.purchasePrice,
        currentValue: currentValue,
        profitLoss,
        profitLossPercent
      };
    }).filter((item): item is (Player & { purchasePrice: number; currentValue: number; profitLoss: number; profitLossPercent: number; }) => item !== null);
  }, [portfolio, allPlayers]);
  
  const totalValue = useMemo(() => portfolioWithDetails.reduce((sum, item) => sum + item.currentValue, 0), [portfolioWithDetails]);
  const totalInvestment = useMemo(() => portfolioWithDetails.reduce((sum, item) => sum + item.purchasePrice, 0), [portfolioWithDetails]);
  const totalProfitLoss = totalValue - totalInvestment;

  // Mock data for chart
  const data = [
      { name: 'Start', value: totalInvestment },
      { name: 'Current', value: totalValue },
  ];

  if (portfolio.length === 0) {
    return (
        <div className="text-center p-10 bg-card rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Your Portfolio is Empty</h2>
            <p className="text-text-secondary">Go to the Market to start investing in players.</p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-text-primary">My Portfolio</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-card p-6 rounded-lg">
            <h3 className="text-lg text-text-secondary">Total Value</h3>
            <p className="text-3xl font-bold text-primary">€{totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-card p-6 rounded-lg">
            <h3 className="text-lg text-text-secondary">Total Investment</h3>
            <p className="text-3xl font-bold">€{totalInvestment.toLocaleString()}</p>
        </div>
        <div className="bg-card p-6 rounded-lg">
            <h3 className="text-lg text-text-secondary">Profit/Loss</h3>
            <p className={`text-3xl font-bold ${totalProfitLoss >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
              €{totalProfitLoss.toLocaleString()}
            </p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-text-primary">Performance</h3>
           <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#d1d5db" />
                    <YAxis stroke="#d1d5db" tickFormatter={(value) => `€${Number(value).toLocaleString()}`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} name="Portfolio Value" />
                </LineChart>
            </ResponsiveContainer>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-text-primary">Holdings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3">Player</th>
                <th className="p-3">Purchase Value</th>
                <th className="p-3">Current Value</th>
                <th className="p-3">Profit/Loss</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {portfolioWithDetails.map(item => (
                <tr key={item.id} className="border-b border-gray-700 hover:bg-background">
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">€{item.purchasePrice.toLocaleString()}</td>
                  <td className="p-3">€{item.currentValue.toLocaleString()}</td>
                  <td className={`p-3 font-semibold ${item.profitLoss >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    €{item.profitLoss.toLocaleString()} ({item.profitLossPercent.toFixed(2)}%)
                  </td>
                  <td className="p-3">
                    <button onClick={() => sellPlayer(item.id)} className="bg-accent-red text-white font-bold py-1 px-3 rounded hover:bg-red-600 transition-colors">
                      Sell
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioView;
