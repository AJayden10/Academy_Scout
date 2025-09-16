
export interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  club: string;
  nationality: string;
  imageUrl: string;
  currentValue: number;
  predictedValue: number; // 1-3 years out
  potential: 'Elite' | 'Starter' | 'Bench';
  injuryRisk: number; // percentage
  stats: {
    appearances: number;
    goals: number;
    assists: number;
  };
}

export interface PortfolioItem {
  playerId: number;
  shares: number; // can represent a fraction of a player's contract
  purchasePrice: number;
}

export interface User {
  id: number;
  name: string;
  portfolioValue: number;
  rank: number;
}

export interface MarketDataPoint {
  date: string;
  value: number;
}
