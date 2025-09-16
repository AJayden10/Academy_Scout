
import React, { useState, useCallback, useMemo } from 'react';
import type { Player, PortfolioItem } from './types';
import { useMockData } from './hooks/useMockData';
import Layout from './components/Layout';
import PlayerCard from './components/PlayerCard';
import PortfolioView from './components/PortfolioView';
import PlayerDetailView from './components/PlayerDetailView';
import LeaderboardTable from './components/LeaderboardTable';
import MarketTrendChart from './components/MarketTrendChart';

enum View {
  Market,
  Portfolio,
  Leaderboard,
  PlayerDetail,
}

const App: React.FC = () => {
  const { players, leaderboard, marketData } = useMockData();
  const [currentView, setCurrentView] = useState<View>(View.Market);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [budget, setBudget] = useState<number>(100000000);

  const portfolioValue = useMemo(() => {
    return portfolio.reduce((total, item) => {
      const currentPlayer = players.find(p => p.id === item.playerId);
      return total + (currentPlayer ? currentPlayer.currentValue : item.purchasePrice);
    }, 0);
  }, [portfolio, players]);
  
  const totalAssets = budget + portfolioValue;

  const handleSelectPlayer = useCallback((player: Player) => {
    setSelectedPlayer(player);
    setCurrentView(View.PlayerDetail);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedPlayer(null);
    setCurrentView(View.Market);
  }, []);

  const buyPlayer = useCallback((player: Player, amount: number) => {
    if (budget >= amount) {
      setBudget(prev => prev - amount);
      setPortfolio(prevPortfolio => {
        const existing = prevPortfolio.find(p => p.playerId === player.id);
        if (existing) {
          return prevPortfolio.map(p => 
            p.playerId === player.id 
              ? { ...p, shares: p.shares + (amount / player.currentValue), purchasePrice: player.currentValue } 
              : p
          );
        } else {
          return [...prevPortfolio, {
            playerId: player.id,
            shares: amount / player.currentValue,
            purchasePrice: player.currentValue
          }];
        }
      });
      alert(`Successfully invested €${amount.toLocaleString()} in ${player.name}!`);
    } else {
      alert("Insufficient funds!");
    }
  }, [budget]);

  const sellPlayer = useCallback((playerId: number) => {
    const item = portfolio.find(p => p.playerId === playerId);
    const player = players.find(p => p.id === playerId);
    if (item && player) {
      const saleValue = player.currentValue;
      setBudget(prev => prev + saleValue);
      setPortfolio(prev => prev.filter(p => p.playerId !== playerId));
      alert(`Sold ${player.name} for €${saleValue.toLocaleString()}!`);
    }
  }, [portfolio, players]);


  const renderContent = () => {
    switch (currentView) {
      case View.Market:
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-text-primary">Player Market</h2>
            <div className="mb-8 p-6 bg-card rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-text-primary">Market Trend</h3>
              <MarketTrendChart data={marketData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {players.map(player => (
                <PlayerCard key={player.id} player={player} onSelect={handleSelectPlayer} />
              ))}
            </div>
          </div>
        );
      case View.Portfolio:
        return <PortfolioView portfolio={portfolio} allPlayers={players} sellPlayer={sellPlayer} />;
      case View.Leaderboard:
        return <LeaderboardTable users={leaderboard} currentUserValue={totalAssets} />;
      case View.PlayerDetail:
        return selectedPlayer && <PlayerDetailView player={selectedPlayer} onBack={handleBackToList} onBuy={buyPlayer} />;
      default:
        return null;
    }
  };

  return (
    <Layout 
      currentView={currentView}
      setCurrentView={setCurrentView}
      budget={budget}
      portfolioValue={portfolioValue}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
