// /src/app/risk-assessment/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Shield, AlertTriangle, Lightbulb } from 'lucide-react';
import { generateRiskBriefing, GenerateRiskBriefingOutput } from '@/ai/flows/risk-assessment-flow';
import { motion, AnimatePresence } from 'framer-motion';

const industries = [
  'Government & Defense',
  'Financial Institutions',
  'Critical Infrastructure',
  'Technology & IP',
  'Pharmaceuticals',
  'Healthcare',
  'Other',
];

const formSchema = z.object({
  industry: z.string().min(1, { message: 'Please select an industry.' }),
  dataTypes: z.string().min(10, {
    message: 'Please describe your data types in at least 10 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RiskAssessmentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [briefing, setBriefing] = useState<GenerateRiskBriefingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: '',
      dataTypes: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setBriefing(null);

    try {
      const result = await generateRiskBriefing(values);
      setBriefing(result);
    } catch (e) {
      setError('An error occurred while generating the briefing. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, index) => {
        if (line.startsWith('* ')) {
            return <li key={index} className="ml-4 list-disc">{line.substring(2)}</li>;
        }
        return <p key={index}>{line}</p>;
    });
  };

  return (
    <div className="bg-background">
      <section className="pt-32 pb-16">
        <header className="container text-center">
          <h1 className="text-5xl font-bold tracking-tighter md:text-7xl">
            Quantum Risk Briefing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Generate a personalized, AI-powered analysis of the quantum threats facing your organization.
          </p>
        </header>
      </section>

      <section className="pb-24">
        <div className="container max-w-4xl">
          <Card className="border-border/50 bg-secondary/30 p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Your Industry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the industry you operate in" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dataTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Sensitive Data Types</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Patient medical records, financial transaction data, proprietary R&D formulas, government communications..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                    <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Briefing...
                        </>
                    ) : (
                        'Analyze My Risk'
                    )}
                    </Button>
                </div>
              </form>
            </Form>
          </Card>

          <AnimatePresence>
            {isLoading && (
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-12 text-center"
                >
                    <div className="flex justify-center items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-lg text-muted-foreground">AI is analyzing your risk profile... This may take a moment.</p>
                    </div>
                </motion.div>
            )}
            {error && <div className="mt-12 text-center text-destructive">{error}</div>}
            {briefing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-12"
              >
                <Card className="border-primary/20 bg-secondary/20 p-8 shadow-xl">
                  <CardContent className="space-y-12">
                     <div>
                      <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tighter text-foreground mb-4">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                        Top Quantum Threats
                      </h2>
                      <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                        {renderMarkdown(briefing.topThreats)}
                      </div>
                    </div>

                    <div>
                      <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tighter text-foreground mb-4">
                        <Lightbulb className="h-8 w-8 text-primary" />
                        "Harvest Now, Decrypt Later" Scenarios
                      </h2>
                      <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                        {renderMarkdown(briefing.hndlScenarios)}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tighter text-foreground mb-4">
                        <Shield className="h-8 w-8 text-primary" />
                        Recommended BetelSec Solutions
                      </h2>
                       <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                         {renderMarkdown(briefing.productRecommendations)}
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
