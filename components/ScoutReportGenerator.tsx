
import React, { useState, useCallback } from 'react';
import type { Player } from '../types';
import { generateScoutReport } from '../services/geminiService';
import { DocumentTextIcon, SparklesIcon } from './icons/Icons';

interface ScoutReportGeneratorProps {
  player: Player;
}

const ScoutReportGenerator: React.FC<ScoutReportGeneratorProps> = ({ player }) => {
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      const result = await generateScoutReport(player);
      // Basic markdown formatting
      const formattedResult = result
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
        .replace(/\n/g, '<br />');
      setReport(formattedResult);
    } catch (e) {
      setError("Failed to generate report.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [player]);

  return (
    <div className="bg-background p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold flex items-center space-x-2">
            <DocumentTextIcon />
            <span>AI Scout Report</span>
        </h3>
        <button
          onClick={handleGenerateReport}
          disabled={isLoading}
          className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
            <SparklesIcon />
          <span>{isLoading ? 'Generating...' : 'Generate Report'}</span>
        </button>
      </div>
      
      {isLoading && <div className="text-center p-4">Loading report...</div>}
      {error && <div className="text-center p-4 text-accent-red">{error}</div>}
      
      {report ? (
        <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: report }}></div>
      ) : (
        <p className="text-text-secondary">Click the button to generate an in-depth AI-powered analysis and investment recommendation for {player.name}.</p>
      )}
    </div>
  );
};

export default ScoutReportGenerator;
