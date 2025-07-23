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
  dataTypes: z.string().describe('A description of the sensitive data types the user handles.'),
});
export type GenerateRiskBriefingInput = z.infer<typeof GenerateRiskBriefingInputSchema>;

const GenerateRiskBriefingOutputSchema = z.object({
  topThreats: z.string().describe("A markdown-formatted string outlining the top 3 quantum threats for the specified industry, explaining why each is a risk."),
  hndlScenarios: z.string().describe("A markdown-formatted string with 2-3 specific 'Harvest Now, Decrypt Later' scenarios relevant to the user's data types."),
  productRecommendations: z.string().describe("A markdown-formatted string recommending specific BetelSec products (PRISM, SYNAPSE, DSG, QRC-84) to mitigate these threats, explaining why each is a good fit."),
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

    The client is in the '{{{industry}}}' industry and is concerned about protecting the following data: '{{{dataTypes}}}'.

    Based on this information, generate the following sections. Use markdown for formatting, especially bullet points (*).

    1.  **Top Quantum Threats:** Identify the top 3 quantum threats for the client's industry. For each threat, briefly explain the specific risk it poses.
    2.  **"Harvest Now, Decrypt Later" Scenarios:** Create 2-3 plausible scenarios describing how an adversary could be harvesting their specific data types ('{{{dataTypes}}}') today for future decryption. Make these scenarios concrete and impactful.
    3.  **Recommended BetelSec Solutions:** Recommend specific BetelSec products (from the list: PRISM, SYNAPSE, DSG, QRC-84) to mitigate these threats. For each recommendation, clearly state which threat it addresses and why it is the appropriate solution. Be direct and confident in your recommendations.
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
