'use server';
/**
 * @fileOverview An AI flow for suggesting a user's industry based on a description.
 *
 * - suggestIndustry - A function that handles the industry suggestion.
 * - SuggestIndustryInput - The input type for the flow.
 * - SuggestIndustryOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const industries = [
  'Government & Defense',
  'Financial Institutions',
  'Critical Infrastructure',
  'Technology & IP',
  'Pharmaceuticals',
  'Healthcare',
  'Other',
];

const SuggestIndustryInputSchema = z.object({
  companyDescription: z.string().describe("A brief description of the user's company, its services, and customers."),
});
export type SuggestIndustryInput = z.infer<typeof SuggestIndustryInputSchema>;

const SuggestIndustryOutputSchema = z.object({
  industry: z.enum(industries as [string, ...string[]]).describe("The suggested industry for the company."),
});
export type SuggestIndustryOutput = z.infer<typeof SuggestIndustryOutputSchema>;


export async function suggestIndustry(input: SuggestIndustryInput): Promise<SuggestIndustryOutput> {
  return suggestIndustryFlow(input);
}


const suggestIndustryPrompt = ai.definePrompt({
  name: 'suggestIndustryPrompt',
  input: { schema: SuggestIndustryInputSchema },
  output: { schema: SuggestIndustryOutputSchema },
  prompt: `
    Based on the following company description, select the single best-fitting industry from the provided list.

    Company Description: {{{companyDescription}}}

    Your response MUST be one of the following options:
    - Government & Defense
    - Financial Institutions
    - Critical Infrastructure
    - Technology & IP
    - Pharmaceuticals
    - Healthcare
    - Other
  `,
});

const suggestIndustryFlow = ai.defineFlow(
  {
    name: 'suggestIndustryFlow',
    inputSchema: SuggestIndustryInputSchema,
    outputSchema: SuggestIndustryOutputSchema,
  },
  async (input) => {
    const { output } = await suggestIndustryPrompt(input);
    if (!output) {
      throw new Error("Failed to suggest an industry from the AI model.");
    }
    return output;
  }
);
