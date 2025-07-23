// /src/app/risk-assessment/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Shield, AlertTriangle, FileText } from 'lucide-react';
import { generateRiskBriefing, GenerateRiskBriefingOutput } from '@/ai/flows/risk-assessment-flow';
import { suggestIndustry } from '@/ai/flows/suggest-industry-flow';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import debounce from 'lodash.debounce';


const industries = [
  'Aerospace & Defense',
  'Automotive',
  'Banking & Capital Markets',
  'Chemicals',
  'Consumer Products',
  'Education',
  'Energy, Resources & Industrials',
  'Financial Services',
  'Government & Public Services',
  'Healthcare',
  'Hospitality',
  'Insurance',
  'Life Sciences & Pharmaceuticals',
  'Manufacturing',
  'Media & Entertainment',
  'Mining & Metals',
  'Oil, Gas & Chemicals',
  'Power, Utilities & Renewables',
  'Real Estate',
  'Retail',
  'Technology, Media & Telecommunications',
  'Transportation & Logistics',
  'Other',
];

const enterpriseSizes = [
    { value: 'small', label: 'Small (1-50 employees)' },
    { value: 'medium', label: 'Medium (51-500 employees)' },
    { value: 'large', label: 'Large (501+ employees)' },
];

const formSchema = z.object({
  companyName: z.string().min(2, { message: 'Please enter your company name.' }),
  companyDescription: z.string().min(20, { message: 'Please provide at least 20 characters about your company.' }),
  industry: z.string().min(1, { message: 'Please select an industry.' }),
  enterpriseSize: z.string().min(1, { message: 'Please select your company size.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RiskAssessmentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [briefing, setBriefing] = useState<GenerateRiskBriefingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      companyDescription: '',
      industry: '',
      enterpriseSize: '',
    },
  });

  const companyDescription = form.watch('companyDescription');

  const debouncedIndustrySuggest = useCallback(
    debounce(async (description: string) => {
      if (description.length > 20) {
        setIsSuggesting(true);
        try {
          const { industry } = await suggestIndustry({ companyDescription: description });
          if (industry && industries.includes(industry)) {
            form.setValue('industry', industry, { shouldValidate: true });
          }
        } catch (e) {
          console.error("Failed to suggest industry:", e);
        } finally {
          setIsSuggesting(false);
        }
      }
    }, 500),
    [form]
  );

  useEffect(() => {
    debouncedIndustrySuggest(companyDescription);
    return () => {
      debouncedIndustrySuggest.cancel();
    }
  }, [companyDescription, debouncedIndustrySuggest]);

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
    // A simple markdown renderer that handles paragraphs and bullet points
    return text.split('\n').map((line, index, array) => {
        if (line.startsWith('* ')) {
            return <li key={index} className="ml-4 list-disc">{line.substring(2)}</li>;
        } else if (line.trim() === '') {
            return <div key={index} className="h-4"></div>;
        } else if (index > 0 && array[index - 1].startsWith('* ') && !line.startsWith('* ')) {
             return <p key={index} className="mt-4">{line}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="enterpriseSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Company Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your company size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {enterpriseSizes.map((size) => (
                                <SelectItem key={size.value} value={size.value}>
                                  {size.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="companyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">About Your Company</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Briefly describe your company, its services, and customers. This will help us tailor the analysis." {...field} className="min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg flex items-center gap-2">
                        Your Industry
                        {isSuggesting && <Loader2 className="h-4 w-4 animate-spin" />}
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
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
                        <p className="text-lg text-muted-foreground">BetelSec is analyzing your profile please wait.</p>
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
                        <FileText className="h-8 w-8 text-primary" />
                        Sensitive Data Profile
                      </h2>
                      <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                        {renderMarkdown(briefing.sensitiveData)}
                      </div>
                    </div>

                    <div>
                      <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tighter text-foreground mb-4">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                        Threat Analysis & Real-World Impact
                      </h2>
                      <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                        {renderMarkdown(briefing.threats)}
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
