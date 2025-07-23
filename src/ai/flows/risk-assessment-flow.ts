// @/ai/flows/risk-assessment-flow.ts
'use server';
/**
 * @fileOverview An AI flow for generating a quantum risk briefing.
 *
 * - generateRiskBriefing - A function that handles the risk briefing generation.
 * - GenerateRiskBriefingInput - The input type for the risk briefing flow.
 * - GenerateRiskBriefingOutput - The return type for the risk briefing flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define Zod schemas for input and output
const GenerateRiskBriefingInputSchema = z.object({
  industry: z.string().describe('The industry the user operates in.'),
  enterpriseSize: z.string().describe("The size of the user's company (small, medium, or large)."),
});
export type GenerateRiskBriefingInput = z.infer<typeof GenerateRiskBriefingInputSchema>;

const GenerateRiskBriefingOutputSchema = z.object({
  sensitiveData: z.string().describe("A markdown-formatted string identifying the typical sensitive data for the specified industry."),
  threats: z.string().describe("A markdown-formatted string detailing likely threats, targeting frequency, and a real-world scenario with financial impact."),
  productRecommendations: z.string().describe("A markdown-formatted string recommending specific BetelSec products based on company size and threats."),
});
export type GenerateRiskBriefingOutput = z.infer<typeof GenerateRiskBriefingOutputSchema>;


// The main exported function that calls the Genkit flow
export async function generateRiskBriefing(input: GenerateRiskBriefingInput): Promise<GenerateRiskBriefingOutput> {
  return generateRiskBriefingFlow(input);
}


// Define the Genkit Prompt
const riskBriefingPrompt = ai.definePrompt({
  name: 'riskBriefingPrompt',
  input: { schema: GenerateRiskBriefingInputSchema },
  output: { schema: GenerateRiskBriefingOutputSchema },
  prompt: `
    You are an expert Post-Quantum Cryptography (PQC) and cybersecurity strategist working for BetelSec.
    Your task is to generate a concise, personalized quantum risk briefing for a potential client.

    The client is in the '{{{industry}}}' industry and their company size is '{{{enterpriseSize}}}'.

    Based on this information, generate the following sections. Use markdown for formatting, especially bullet points (*).

    1.  **Sensitive Data Profile:** Identify and list the most common and critical sensitive data types that are typically handled by organizations in the '{{{industry}}}' sector.

    2.  **Threat Analysis & Real-World Impact:**
        *   Describe the most likely quantum and classical cyber threats this industry faces (e.g., Harvest Now, Decrypt Later, state-sponsored espionage, ransomware).
        *   Comment on how frequently companies in this sector are targeted.
        *   Provide a specific, real-world example of a major cyberattack that has recently impacted the '{{{industry}}}' sector. You MUST use a well-known incident (e.g., Change Healthcare for Healthcare, CDK Global for automotive, etc.). Describe the attack and, most importantly, state the financial loss, ensuring it is a multi-million dollar figure to underscore the severity of the threat.

    3.  **Recommended BetelSec Solutions:** Recommend specific BetelSec products based on the following rules:
        *   **Always recommend PRISM initially** for every company size as a foundational layer. Explain that it provides comprehensive data protection and AI-driven threat mitigation.
        *   If the company size is 'small' or 'medium', **also recommend SYNAPSE and DSG**. Explain that SYNAPSE protects their data in transit (e.g., network traffic, APIs) and DSG protects their data at rest (e.g., databases, stored files), which are critical for growing businesses.
        *   For 'large' enterprises, only recommend PRISM as the initial talking point, as their needs are more complex and would require a deeper consultation.
  `,
});


// Define the Genkit Flow
const generateRiskBriefingFlow = ai.defineFlow(
  {
    name: 'generateRiskBriefingFlow',
    inputSchema: GenerateRiskBriefingInputSchema,
    outputSchema: GenerateRiskBriefingOutputSchema,
  },
  async (input) => {
    const { output } = await riskBriefingPrompt(input);
    if (!output) {
        throw new Error("Failed to generate a valid risk briefing from the AI model.");
    }
    return output;
  }
);
