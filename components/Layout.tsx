
import React from 'react';
import { ChartPieIcon, CurrencyEuroIcon, HomeIcon, StarIcon, TrophyIcon } from './icons/Icons';

interface LayoutProps {
  children: React.ReactNode;
  currentView: number;
  setCurrentView: (view: number) => void;
  budget: number;
  portfolioValue: number;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
  <button onClick={onClick} className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary text-white' : 'hover:bg-secondary'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ children, currentView, setCurrentView, budget, portfolioValue }) => {
  const totalAssets = budget + portfolioValue;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <StarIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-text-primary">Academy Scout</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-2">
              <NavItem icon={<HomeIcon />} label="Market" isActive={currentView === 0} onClick={() => setCurrentView(0)} />
              <NavItem icon={<ChartPieIcon />} label="Portfolio" isActive={currentView === 1} onClick={() => setCurrentView(1)} />
              <NavItem icon={<TrophyIcon />} label="Leaderboard" isActive={currentView === 2} onClick={() => setCurrentView(2)} />
            </nav>
            <div className="flex items-center">
              <div className="text-right">
                <p className="text-sm text-text-secondary">Total Assets</p>
                <p className="font-bold text-lg text-accent-green">€{totalAssets.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow py-8">
        <main>{children}</main>
      </div>
      
      {/* Mobile Navigation */}
      <footer className="md:hidden bg-card border-t border-gray-700 fixed bottom-0 left-0 right-0 z-10">
          <nav className="flex items-center justify-around p-2">
              <NavItem icon={<HomeIcon />} label="Market" isActive={currentView === 0} onClick={() => setCurrentView(0)} />
              <NavItem icon={<ChartPieIcon />} label="Portfolio" isActive={currentView === 1} onClick={() => setCurrentView(1)} />
              <NavItem icon={<TrophyIcon />} label="Leaderboard" isActive={currentView === 2} onClick={() => setCurrentView(2)} />
          </nav>
      </footer>
      <div className="md:hidden h-16"></div> {/* Spacer for mobile nav */}
    </div>
  );
};

export default Layout;
