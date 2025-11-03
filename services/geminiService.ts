
import { GoogleGenAI, Type } from "@google/genai";
import type { SearchFilters, Exhibition } from '../types';

export async function fetchExhibitions(filters: SearchFilters): Promise<Exhibition[]> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an advanced AI agent specialized in finding and verifying trade exhibition invitations in China.
    Based on the following criteria, generate a list of 10 fictional but highly realistic trade exhibitions.
    
    Criteria:
    - Province: ${filters.province === 'Any' ? 'Any province in China' : filters.province}
    - City: ${filters.city === 'Any' ? 'Any major city' : filters.city}
    - Category: ${filters.category === 'Any' ? 'Any category' : filters.category}
    - Date Range: ${filters.startDate} to ${filters.endDate}
    - Invitation Type: ${filters.invitation === 'Any' ? 'Both Free and Paid' : filters.invitation}
    
    Your response MUST be a valid JSON array of objects. Each object must conform to the provided schema.
    Provide realistic but fictional data for all fields, including official-looking websites (e.g., example.com domains).
    Ensure dates are within the specified range.
  `;
  
  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "A unique identifier, e.g., 'canton-fair-2025-spring'" },
        name: { type: Type.STRING },
        province: { type: Type.STRING },
        city: { type: Type.STRING },
        category: { type: Type.STRING },
        startDate: { type: Type.STRING, description: "Format: YYYY-MM-DD" },
        endDate: { type: Type.STRING, description: "Format: YYYY-MM-DD" },
        venue: { type: Type.STRING },
        organizer: { type: Type.STRING },
        website: { type: Type.STRING, description: "A valid-looking but fictional URL" },
        invitationType: { type: Type.STRING, description: "Either 'Free' or 'Paid'" },
      },
      required: [
        "id", "name", "province", "city", "category", "startDate", "endDate",
        "venue", "organizer", "website", "invitationType"
      ],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    return data as Exhibition[];
  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Failed to parse response from Gemini API.");
  }
}
