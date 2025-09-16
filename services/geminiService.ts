
import { GoogleGenAI } from "@google/genai";
import type { Player } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateScoutReport = async (player: Player): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please set the API_KEY environment variable.";
  }

  const prompt = `
    You are an expert soccer scout for a top European club. Your task is to provide a detailed investment analysis for a young player.
    Based on the data below, generate a professional scout report.

    **Player Data:**
    - **Name:** ${player.name}
    - **Age:** ${player.age}
    - **Position:** ${player.position}
    - **Club:** ${player.club}
    - **Nationality:** ${player.nationality}
    - **Current Market Value:** €${player.currentValue.toLocaleString()}
    - **Performance Stats:** ${player.stats.appearances} appearances, ${player.stats.goals} goals, ${player.stats.assists} assists.

    **AI-Powered Predictions:**
    - **Predicted Future Market Value (in 2 years):** €${player.predictedValue.toLocaleString()}
    - **Potential Level:** ${player.potential}
    - **Injury Risk:** ${player.injuryRisk}% chance of significant injury next season.

    **Scout Report Sections:**
    1.  **Executive Summary:** A brief, high-level overview of the player and your investment recommendation (e.g., 'Strong Buy', 'Monitor', 'Avoid').
    2.  **Strengths & Weaknesses:** Analyze the player's key attributes based on their position and stats.
    3.  **Potential & Development Trajectory:** Elaborate on their predicted potential. What does '${player.potential}' mean for their career? What do they need to work on?
    4.  **Financial Analysis & Risk Assessment:** Discuss the investment potential. Is the predicted value growth realistic? How does the injury risk factor into the decision?
    5.  **Final Verdict:** Conclude with a clear investment recommendation and reasoning.

    Generate the report in markdown format.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating scout report:", error);
    return "An error occurred while generating the scout report. Please check the console for details.";
  }
};
