import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    if (!process.env.API_KEY) {
      console.error('Gemini API key not found in environment variables.');
    } else {
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
  }

  async generateExperienceDescription(jobTitle: string, company: string): Promise<string> {
    if (!this.ai) {
        return Promise.reject('Gemini AI not initialized. Check API Key.');
    }
    
    if (!jobTitle.trim() || !company.trim()) {
        return Promise.resolve('');
    }

    try {
      const prompt = `Generate 3-4 concise, professional resume bullet points for the job title '${jobTitle}' at company '${company}'. Focus on achievements and responsibilities. Use action verbs. Start each bullet point with a hyphen and a space. Do not include a header or any other text, just the bullet points. Each bullet point should be on a new line.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text.trim();
    } catch (error) {
      console.error('Error generating experience description:', error);
      throw new Error('Could not generate description.');
    }
  }
}
