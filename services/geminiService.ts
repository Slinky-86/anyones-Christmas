import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGreeting = async (
  recipient: string,
  tone: string,
  relationship: string
): Promise<string> => {
  try {
    const prompt = `Write a short, heartwarming Christmas or Holiday greeting card message (max 30 words).
    Recipient: ${recipient || 'friend'}.
    Relationship: ${relationship || 'general'}.
    Tone: ${tone || 'warm'}.
    Output only the message text, no quotes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "Merry Christmas!";
  } catch (error) {
    console.error("Error generating greeting:", error);
    // Fallback in case of API error or quota issues
    return "May your days be merry and bright!";
  }
};
