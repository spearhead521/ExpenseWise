'use server';

/**
 * @fileOverview An AI agent for providing smart expense insights.
 *
 * - getSmartExpenseInsights - A function that retrieves smart expense insights based on user transaction history.
 * - SmartExpenseInsightsInput - The input type for the getSmartExpenseInsights function.
 * - SmartExpenseInsightsOutput - The return type for the getSmartExpenseInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartExpenseInsightsInputSchema = z.object({
  transactionHistory: z.string().describe('The transaction history of the user.'),
  currentMonthExpenses: z.number().describe('The total expenses for the current month.'),
  lastMonthExpenses: z.number().describe('The total expenses for the last month.'),
  spendingByCategory: z
    .record(z.number())
    .describe('A map of spending by category, with category names as keys and spending amounts as values.'),
  monthlyBudget: z.number().optional().describe('The user set monthly budget, or null if no budget has been set.'),
});
export type SmartExpenseInsightsInput = z.infer<typeof SmartExpenseInsightsInputSchema>;

const SmartExpenseInsightsOutputSchema = z.object({
  insights: z.array(z.string()).describe('An array of insights about the user\'s spending habits.'),
});
export type SmartExpenseInsightsOutput = z.infer<typeof SmartExpenseInsightsOutputSchema>;

export async function getSmartExpenseInsights(
  input: SmartExpenseInsightsInput
): Promise<SmartExpenseInsightsOutput> {
  return smartExpenseInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartExpenseInsightsPrompt',
  input: {schema: SmartExpenseInsightsInputSchema},
  output: {schema: SmartExpenseInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's transaction history and provide insights.

Transaction History: {{{transactionHistory}}}
Current Month Expenses: {{{currentMonthExpenses}}}
Last Month Expenses: {{{lastMonthExpenses}}}
Spending By Category: {{#each spendingByCategory}}{{{@key}}}: {{{this}}} {{/each}}

{% raw %}{{#if monthlyBudget}}Monthly Budget: {{{monthlyBudget}}}{{/if}}{% endraw %}

Provide insights such as:
- "You are overspending in [category] category compared to last month"
- "Your expenses increased [percentage]% this week"
- "You spend most on weekends"
- Warnings or suggestions related to the monthly budget.

Insights should be concise and actionable.

Output the insights in a JSON array of strings.
`,
});

const smartExpenseInsightsFlow = ai.defineFlow(
  {
    name: 'smartExpenseInsightsFlow',
    inputSchema: SmartExpenseInsightsInputSchema,
    outputSchema: SmartExpenseInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
