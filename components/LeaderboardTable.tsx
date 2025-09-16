
import React from 'react';
import type { User } from '../types';

interface LeaderboardTableProps {
  users: User[];
  currentUserValue: number;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users, currentUserValue }) => {
  const usersWithCurrentUser = [...users, { id: 0, name: 'You', portfolioValue: currentUserValue, rank: 0 }]
    .sort((a, b) => b.portfolioValue - a.portfolioValue)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-text-primary mb-6">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-primary">
              <th className="p-4 font-semibold text-lg">Rank</th>
              <th className="p-4 font-semibold text-lg">User</th>
              <th className="p-4 font-semibold text-lg">Portfolio Value</th>
            </tr>
          </thead>
          <tbody>
            {usersWithCurrentUser.map(user => (
              <tr 
                key={user.id} 
                className={`border-b border-gray-700 ${user.name === 'You' ? 'bg-primary/20' : 'hover:bg-background'}`}
              >
                <td className="p-4 text-xl font-bold">{user.rank}</td>
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 font-semibold text-accent-green">€{user.portfolioValue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
