
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { MarketDataPoint } from '../types';

interface MarketTrendChartProps {
  data: MarketDataPoint[];
}

const MarketTrendChart: React.FC<MarketTrendChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#d1d5db" />
        <YAxis stroke="#d1d5db" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            color: '#f9fafb',
          }}
          labelStyle={{ color: '#d1d5db' }}
        />
        <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={3} dot={false} name="Market Index" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MarketTrendChart;
