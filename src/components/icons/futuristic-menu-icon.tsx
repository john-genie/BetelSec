'use client';

import { motion } from 'framer-motion';

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(var(--foreground))"
    strokeLinecap="round"
    {...props}
  />
);

export function FuturisticMenuIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      initial={false}
      animate={open ? 'open' : 'closed'}
    >
      <Path
        variants={{
          closed: { d: 'M 2 6 L 22 6' },
          open: { d: 'M 4 18 L 20 2' },
        }}
        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      />
      <Path
        d="M 2 12 L 22 12"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.2 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 18 L 22 18' },
          open: { d: 'M 4 2 L 20 18' },
        }}
        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      />
    </motion.svg>
  );
}
