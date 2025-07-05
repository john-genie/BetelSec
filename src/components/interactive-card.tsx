'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React from 'react';
import { cn } from '@/lib/utils';

type InteractiveCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function InteractiveCard({ children, className }: InteractiveCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 200, damping: 25, mass: 0.5 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 25, mass: 0.5 });

  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);
  const scale = useTransform(mouseY, [-150, 150], [1.05, 0.95]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className={cn('h-full', className)}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="h-full"
      >
        <div className="animate-float h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
