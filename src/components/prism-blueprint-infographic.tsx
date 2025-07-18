'use client';

import { ArrowRight, BrainCircuit, Database, File, Lock, ShieldCheck, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const arrowVariants = {
  hidden: { pathLength: 0 },
  visible: { 
    pathLength: 1,
    transition: {
        duration: 0.8,
        ease: "easeInOut"
    }
  },
};

const FlowNode = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
    const Icon = icon;
    return (
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/30 bg-secondary/50 shadow-lg">
                <Icon className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </motion.div>
    )
}

const FlowArrow = () => (
    <motion.div variants={itemVariants} className="flex-1 flex items-center justify-center -mx-4">
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-8 text-primary/50">
            <motion.path 
                d="M5 10 L95 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                fill="none"
                variants={arrowVariants}
            />
            <motion.path 
                d="M90 5 L95 10 L90 15"
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                fill="none"
                variants={arrowVariants}
            />
        </svg>
    </motion.div>
)


export const PrismBlueprintInfographic = () => {
  return (
    <div className="rounded-xl border bg-secondary/20 p-8">
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-y-8 gap-x-4"
        >
            {/* Row 1: Nodes */}
            <FlowNode 
                icon={Wifi}
                title="Data Ingestion"
                description="Secures all incoming data streams, in-transit, from any source."
            />
            <FlowArrow />
            <FlowNode 
                icon={BrainCircuit}
                title="AI Threat Analysis"
                description="Real-time DLP analysis and threat classification without decryption."
            />
             <FlowArrow />
            <FlowNode 
                icon={Lock}
                title="Hybrid PQC Engine"
                description="Applies a robust combination of classical and quantum-resistant encryption."
            />

            {/* Row 2: Arrow Down */}
             <div className="col-start-5 col-end-6 row-start-2 row-end-3 flex justify-center items-center h-20">
                <motion.div variants={itemVariants}>
                    <ArrowRight className="h-10 w-10 text-primary/50 rotate-90" />
                </motion.div>
            </div>

            {/* Row 3: Nodes Reversed */}
            <div className="col-start-3 col-end-6 row-start-3 row-end-4 grid grid-cols-[1fr_auto_1fr] items-start gap-x-4">
                <FlowNode 
                    icon={ShieldCheck}
                    title="Secured Asset"
                    description="Data is now quantum-proof and ready for its intended use."
                />
                <FlowArrow />
                <FlowNode 
                    icon={Database}
                    title="Data At-Rest"
                    description="Ensures long-term security for data in storage and archives."
                />
            </div>
        </motion.div>

        {/* Mobile layout */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col md:hidden items-center gap-y-4"
        >
            <FlowNode 
                icon={Wifi}
                title="Data Ingestion"
                description="Secures all incoming data streams, in-transit, from any source."
            />
            <motion.div variants={itemVariants}><ArrowRight className="h-10 w-10 text-primary/50 rotate-90 my-4" /></motion.div>
            <FlowNode 
                icon={BrainCircuit}
                title="AI Threat Analysis"
                description="Real-time DLP analysis and threat classification without decryption."
            />
            <motion.div variants={itemVariants}><ArrowRight className="h-10 w-10 text-primary/50 rotate-90 my-4" /></motion.div>
            <FlowNode 
                icon={Lock}
                title="Hybrid PQC Engine"
                description="Applies a robust combination of classical and quantum-resistant encryption."
            />
            <motion.div variants={itemVariants}><ArrowRight className="h-10 w-10 text-primary/50 rotate-90 my-4" /></motion.div>
             <FlowNode 
                icon={Database}
                title="Data At-Rest"
                description="Ensures long-term security for data in storage and archives."
            />
            <motion.div variants={itemVariants}><ArrowRight className="h-10 w-10 text-primary/50 rotate-90 my-4" /></motion.div>
             <FlowNode 
                icon={ShieldCheck}
                title="Secured Asset"
                description="Data is now quantum-proof and ready for its intended use."
            />
        </motion.div>
    </div>
  );
};
