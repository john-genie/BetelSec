'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { InteractiveCard } from '@/components/interactive-card';

const blogPosts = [
  {
    slug: 'google-quantum-rsa-breakthrough',
    title: 'Google Quantum AI: A New Era for Breaking RSA-2048',
    excerpt:
      "A deep dive into Google's latest research, which dramatically reduces the estimated quantum computing power needed to break today's encryption standards.",
  },
  {
    slug: 'psiquantum-ecc-reduction',
    title: 'PsiQuantum: 700× Reduction in Resources to Break ECC',
    excerpt:
      'PsiQuantum has announced a staggering 700-fold reduction in resources needed to break ECC. We unpack what this means for the security of digital signatures.',
  },
  {
    slug: 'nist-pqc-standards-finalized',
    title: 'NIST Finalizes PQC Standards: The Deprecation of RSA/ECC is Coming',
    excerpt:
      'The future is now. NIST has finalized its first set of PQC standards. Learn about the new algorithms and why the clock is ticking on RSA and ECC.',
  },
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
    slug: 'the-role-of-ai-in-post-quantum-security',
    title: 'The Role of AI in Post-Quantum Security with PRISM',
    excerpt:
      'Discover how PRISM leverages artificial intelligence to not only protect data but also to actively mitigate emerging threats in real-time.',
  },
  {
    slug: 'anonymous-communication-in-the-quantum-age',
    title: 'Anonymous Communication: The Power of QRC-84',
    excerpt:
      'Learn how QRC-84 enables untraceable, ephemeral communications, leaving no metadata trail for adversaries to exploit.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function BlogPage() {
  return (
    <div className="bg-background">
      <section className="pt-32 pb-16">
        <header className="container text-center">
          <h1 className="text-5xl font-bold tracking-tighter md:text-7xl">
            Blog
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Insights and analysis from the forefront of quantum security.
          </p>
        </header>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="h-full"
              >
                <InteractiveCard className="h-full">
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
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
