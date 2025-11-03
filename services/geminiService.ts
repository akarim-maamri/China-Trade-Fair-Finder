
import { GoogleGenAI, Type } from "@google/genai";
import type { SearchFilters, Exhibition } from '../types';

export async function fetchExhibitions(filters: SearchFilters): Promise<Exhibition[]> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an advanced AI agent specialized in finding and verifying trade exhibition invitations in China.
    Based on the following criteria, generate a list of 15 fictional but highly realistic trade exhibitions.
    
    Criteria:
    - Province: ${filters.province === 'Any' ? 'Any province in China' : filters.province}
    - City: ${filters.city === 'Any' ? 'Any major city' : filters.city}
    - Category: ${filters.category === 'Any' ? 'Any category' : filters.category}
    - Date Range: ${filters.startDate} to ${filters.endDate}
    - Invitation Type: ${filters.invitationType === 'Any' ? 'Both Free and Paid' : filters.invitationType}
    
    Your response MUST be a valid JSON array of objects. Each object must conform to the provided schema.
    Incorporate intelligent features:
    - Ensure all events are plausible and have a 'verification_status' of true.
    - Simulate 'consular_acceptance' based on the event's perceived legitimacy (most should be true).
    - Provide realistic but fictional data for all fields, including official-looking websites (e.g., example.com domains), contact info, and application links.
    - Ensure dates are within the specified range.
  `;
  
  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        province: { type: Type.STRING },
        city: { type: Type.STRING },
        exhibition_name: { type: Type.STRING },
        category: { type: Type.STRING },
        start_date: { type: Type.STRING, description: "Format: YYYY-MM-DD" },
        end_date: { type: Type.STRING, description: "Format: YYYY-MM-DD" },
        venue: { type: Type.STRING },
        organizer: { type: Type.STRING },
        official_website: { type: Type.STRING, description: "A valid-looking but fictional URL" },
        invitation_type: { type: Type.STRING, description: "Either 'Free Invitation' or 'Paid Invitation'" },
        application_link: { type: Type.STRING, description: "A valid-looking but fictional URL" },
        contact_email: { type: Type.STRING },
        contact_phone: { type: Type.STRING },
        last_updated: { type: Type.STRING, description: "Format: YYYY-MM-DD" },
        verification_status: { type: Type.BOOLEAN },
        consular_acceptance: { type: Type.BOOLEAN },
      },
      required: [
        "province", "city", "exhibition_name", "category", "start_date", "end_date",
        "venue", "organizer", "official_website", "invitation_type", "application_link",
        "contact_email", "contact_phone", "last_updated", "verification_status", "consular_acceptance"
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
        temperature: 0.7,
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
