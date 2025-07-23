
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Footer } from '@/components/layout/footer';
import {
  ArrowRight,
  Shield,
  Eye,
  Crosshair,
  Landmark,
  DollarSign,
  Network,
  BrainCircuit,
  FlaskConical,
  Hospital,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { StrategicPillarCard } from '@/components/strategic-pillar-card';
import { InteractiveCard } from '@/components/interactive-card';
import { ThreatIcon3D } from '@/components/threat-icon-3d';
import QDayCountdown from '@/components/qday-countdown';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const industries = [
  {
    icon: Landmark,
    title: 'Government & Defense',
    description:
      'Securing national interests and mission-critical operations against state-sponsored threats.',
  },
  {
    icon: DollarSign,
    title: 'Financial Institutions',
    description:
      'Protecting financial markets and sensitive economic data from sophisticated cyber adversaries.',
  },
  {
    icon: Network,
    title: 'Critical Infrastructure',
    description:
      'Safeguarding essential services like energy, communications, and transportation systems.',
  },
  {
    icon: BrainCircuit,
    title: 'Technology & IP',
    description:
      'Defending proprietary innovations, trade secrets, and intellectual property from corporate espionage.',
  },
  {
    icon: FlaskConical,
    title: 'Pharmaceuticals',
    description:
      'Protecting proprietary research, clinical trial data, and manufacturing processes.',
  },
  {
    icon: Hospital,
    title: 'Healthcare',
    description:
      'Securing patient records, hospital networks, and connected medical devices.',
  },
];

const pillars = [
  {
    icon: Eye,
    title: 'Anticipate',
    description:
      'Proactive intelligence to identify and map emerging threats before they materialize. We provide clarity in the noise.',
  },
  {
    icon: Crosshair,
    title: 'Neutralize',
    description:
      'Active defense strategies and countermeasures to disrupt and dismantle adversarial campaigns in real-time.',
  },
  {
    icon: Shield,
    title: 'Fortify',
    description:
      'Building long-term resilience through quantum-resistant architecture and continuous security posture enhancement.',
  },
];

const mitigationData = [
  {
    threat: 'Harvest Now, Decrypt Later',
    mitigation: { PRISM: true, SYNAPSE: true, DSG: true, QRC_84: true },
    description:
      'Protecting stored and transmitted data from being captured today and decrypted by future quantum computers.',
  },
  {
    threat: 'Ransomware & Data Exfiltration',
    mitigation: { PRISM: true, SYNAPSE: true, DSG: true, QRC_84: false },
    description:
      'Preventing unauthorized data encryption and blocking the stealthy exfiltration of sensitive information.',
  },
  {
    threat: 'Zero-Day & Advanced Persistent Threats',
    mitigation: { PRISM: true, SYNAPSE: true, DSG: false, QRC_84: false },
    description:
      'Using AI-driven analysis to detect and neutralize novel attacks that evade traditional signature-based defenses.',
  },
  {
    threat: 'Insider Threats & Data Leakage',
    mitigation: { PRISM: true, DSG: true, QRC_84: true, SYNAPSE: false },
    description:
      'Enforcing granular access policies and monitoring data handling to prevent intentional or accidental data loss from within.',
  },
];

const matrixProducts = [
  { id: 'PRISM', name: 'PRISM', href: '/products/prism' },
  { id: 'SYNAPSE', name: 'SYNAPSE', href: '/products/synapse' },
  { id: 'DSG', name: 'DSG', href: '/products/dsg' },
  { id: 'QRC_84', name: 'QRC-84', href: '/products/qrc-84' },
];

const blogPosts = [
  {
    slug: 'change-healthcare-ransomware-attack',
    title: 'Change Healthcare Ransomware Attack: A Multi-Billion Dollar Crisis',
    excerpt: 'An analysis of the February 2024 ALPHV/BlackCat attack that impacted over 100 million patients and is set to cost billions, highlighting the extreme vulnerability of critical healthcare infrastructure.',
  },
  {
    slug: 'cdk-global-ransomware-attack',
    title: 'CDK Global Hack: How BlackSuit Paralyzed 15,000 Car Dealerships',
    excerpt: 'The June 2024 attack by the BlackSuit group disabled operations for nearly 15,000 car dealerships, exposing deep vulnerabilities in automotive retail supply chains.',
  },
   {
    slug: 'synnovis-nhs-ransomware-attack',
    title: 'Synnovis/NHS Attack: How Qilin Crippled London Lab Services',
    excerpt: 'An analysis of the June 2024 attack by the Russian group Qilin, which disrupted thousands of NHS appointments and operations, with patient data stolen and costs soaring into the tens of millions.',
  },
  {
    slug: 'google-quantum-rsa-breakthrough',
    title: 'Google Quantum AI: A New Era for Breaking RSA-2048',
    excerpt:
      "A deep dive into Google's latest research, which dramatically reduces the estimated quantum computing power needed to break today's encryption standards.",
  },
];

export default function Home() {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const matrixContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const matrixCellVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="hero-container relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background py-20 text-center"
      >
        <div className="absolute inset-0 z-0 hero-grid-background" />

        <div className="container relative z-10 flex flex-col items-center p-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-4xl text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
          >
            The Security Of Tomorrow Rethought For Today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-6 max-w-3xl text-lg text-primary md:text-xl text-glow tracking-wider"
          >
            Post-quantum Resilience
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg">
              <Link href="/contact">
                Request a Confidential Briefing <ArrowRight className="ml-2"/>
              </Link>
            </Button>
             <Button asChild size="lg" variant="outline">
              <Link href="/risk-assessment">
                Get Your Free Risk Analysis <ArrowRight className="ml-2"/>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Thought Leadership Section */}
      <section
        id="threats"
        className="items-center bg-secondary overflow-hidden py-32"
      >
        <div className="container">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div className="threat-content">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Threat Analysis
              </h3>
              <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl">
                Harvest Now, Decrypt Later
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Adversaries are actively capturing encrypted data today, betting
                on the future of quantum computing to unlock it. This long-term
                threat requires immediate action to protect sensitive
                information with a long shelf life.
              </p>
              <Button asChild variant="link" className="mt-4 px-0 text-base">
                <Link href="/threats/harvest-now-decrypt-later">
                  Read the full analysis <ArrowRight className="ml-2"/>
                </Link>
              </Button>
            </div>
            <div className="threat-image flex h-full min-h-[300px] sm:min-h-[400px] w-full items-center justify-center">
              <ThreatIcon3D />
            </div>
          </div>
        </div>
      </section>

      {/* Quantum Threat Dashboard Section */}
      <section
        id="q-day"
        className="items-center bg-background overflow-hidden pt-24 pb-32 text-center"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl section-header">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold tracking-tighter text-glow sm:text-4xl md:text-5xl"
            >
              The Quantum Horizon is Closing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Time is the most critical variable in the quantum equation. The
              countdown to "Q-Day"—the moment today's encryption shatters—has
              begun.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="my-16 sm:my-20"
          >
            <QDayCountdown />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-auto max-w-3xl"
          >
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              PRISM: Your Proactive Defense
            </h3>
            <p className="mt-4 text-muted-foreground">
              Don't wait for the breach. Our Post-quantum Resilient Intelligent
              Security Mainframe (PRISM) is engineered to fortify your systems
              now, neutralizing the "Harvest Now, Decrypt Later" threat before
              it materializes. It's comprehensive protection for data in every
              state.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg">
                <Link href="/products/prism">
                  Discover PRISM <ArrowRight className="ml-2"/>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategic Methodology Section */}
      <section
        id="approach"
        className="items-center bg-secondary overflow-hidden py-32"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-20 max-w-3xl text-center section-header">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Strategic Methodology
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A comprehensive framework to secure your organization against
              current and future quantum threats.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {pillars.map((pillar) => (
              <motion.div key={pillar.title} variants={itemVariants} className="h-full">
                <StrategicPillarCard pillar={pillar} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Threat Mitigation Matrix Section */}
      <section
        id="mitigation-matrix"
        className="items-center bg-background overflow-hidden py-32"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-20 max-w-3xl text-center section-header">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Threat Mitigation Matrix
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A comprehensive overview of how our integrated product suite addresses critical security threats across your organization.
            </p>
          </div>

          {/* Desktop Matrix */}
          <motion.div
            variants={matrixContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="hidden lg:grid grid-cols-[1fr,repeat(4,auto)] rounded-lg border border-border/50 bg-secondary/30"
            onMouseLeave={() => setHoveredColumn(null)}
          >
            {/* Header Row */}
            <div className="p-4 text-left font-semibold text-foreground sm:pl-6">Threat Vector</div>
            {matrixProducts.map((product, colIndex) => (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredColumn(colIndex)}
                className={cn(
                    "p-4 text-center font-semibold text-foreground transition-colors duration-300",
                    hoveredColumn === colIndex && "text-primary"
                )}
              >
                <Link href={product.href} className="hover:text-primary hover:underline">
                  {product.name}
                </Link>
              </div>
            ))}

            {/* Data Rows */}
            {mitigationData.map((item, rowIndex) => (
              <div key={item.threat} className="contents group">
                <div 
                    className={cn(
                        "col-span-full row-start-[--row-start] row-end-[--row-end] -mx-px -my-px rounded-lg bg-primary/5 opacity-0 transition-opacity duration-300",
                        "group-hover:opacity-100"
                    )}
                    style={{ '--row-start': rowIndex + 2, '--row-end': rowIndex + 3 } as React.CSSProperties}
                ></div>

                <div className="relative border-t border-border/50 p-4 text-sm sm:pl-6">
                  <div className="font-medium text-foreground">{item.threat}</div>
                  <div className="mt-1 text-muted-foreground">{item.description}</div>
                </div>
                {matrixProducts.map((product, colIndex) => (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredColumn(colIndex)}
                    className={cn(
                      "relative flex items-center justify-center border-t border-border/50 px-3 py-4 text-sm text-muted-foreground transition-colors duration-300",
                      hoveredColumn === colIndex && 'bg-primary/10'
                    )}
                  >
                    {item.mitigation[product.id as keyof typeof item.mitigation] && (
                      <motion.div variants={matrixCellVariants}>
                        <ShieldCheck className="h-6 w-6 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Mobile/Tablet Card List */}
          <div className="grid grid-cols-1 gap-6 lg:hidden md:grid-cols-2">
              {mitigationData.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <InteractiveCard>
                      <Card className="h-full border-border/50 bg-secondary/30">
                          <CardHeader>
                              <CardTitle>{item.threat}</CardTitle>
                              <p className="pt-2 text-sm text-muted-foreground">{item.description}</p>
                          </CardHeader>
                          <CardContent>
                              <h4 className="font-semibold text-foreground mb-3">Mitigated By:</h4>
                              <div className="flex flex-wrap gap-x-6 gap-y-3">
                                  {matrixProducts.map(product => (
                                      <Link
                                          key={product.id}
                                          href={product.href}
                                          className={cn(
                                              "flex items-center gap-2 text-sm",
                                              item.mitigation[product.id as keyof typeof item.mitigation]
                                                  ? "text-primary hover:underline"
                                                  : "text-muted-foreground opacity-60 line-through"
                                          )}
                                      >
                                          <ShieldCheck className={cn("h-5 w-5", item.mitigation[product.id as keyof typeof item.mitigation] ? 'text-primary' : 'text-muted-foreground')} />
                                          <span>{product.name}</span>
                                      </Link>
                                  ))}
                              </div>
                          </CardContent>
                      </Card>
                  </InteractiveCard>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
      
      {/* Industries Section */}
      <section
        id="industries"
        className="items-center bg-secondary overflow-hidden py-32"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-20 max-w-3xl text-center section-header">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Protecting Critical Sectors in India
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide specialized security for India's most targeted
              industries, where the stakes are highest.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {industries.map((industry) => (
              <motion.div key={industry.title} variants={itemVariants}>
                <InteractiveCard>
                  <Card className="h-full min-h-[220px] sm:min-h-[280px] border-border/50 bg-background text-left transition-all duration-300 flex flex-col justify-center">
                    <CardHeader>
                      <industry.icon className="mb-4 h-8 w-8 text-foreground" />
                      <CardTitle>{industry.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {industry.description}
                      </p>
                    </CardContent>
                  </Card>
                </InteractiveCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Briefings Section */}
      <section
        id="recent-briefings"
        className="items-center bg-background overflow-hidden py-32"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-20 max-w-3xl text-center section-header">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Recent Briefings
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Timely analysis of emerging threats and security incidents from the front lines of cyber defense.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.slice(0, 3).map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <InteractiveCard>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-lg border bg-secondary/30 p-6 transition-all duration-300 hover:bg-secondary/60 hover:shadow-[0_0_25px_hsl(var(--primary)/0.2)]"
                  >
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-4 flex-grow text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center font-semibold text-foreground">
                      Read Analysis
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </InteractiveCard>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-16 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/blog">
                View All Briefings <ArrowRight className="ml-2"/>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        id="cta"
        className="flex flex-col items-center justify-center bg-secondary text-foreground py-32"
      >
        <div className="container flex flex-1 flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold tracking-tighter md:text-5xl">
            Initiate Secure Contact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Engage with our experts for a confidential, bespoke consultation on
            your organization's security posture.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2"/>
              </Link>
            </Button>
          </div>
        </div>
        <div className="w-full mt-auto pt-16">
          <Footer />
        </div>
      </section>
    </>
  );
}

    