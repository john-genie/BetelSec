'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Preloader from '@/components/preloader';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isLoading, setIsLoading] = useState(true);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- Static Title & Favicon Logic ---
    document.title = 'BetelSec';
    
    // Remove any existing favicons to prevent conflicts
    const existingFavicons = document.querySelectorAll("link[rel~='icon']");
    existingFavicons.forEach(link => link.remove());

    // Create and set the new favicon
    const svgPath = "M216,60,144,16.43a16.12,16.12,0,0,0-16.06,0L56,60a15.9,15.9,0,0,0-8,13.86V182.14a15.9,15.9,0,0,0,8,13.86l72,43.57a16.12,16.12,0,0,0,16.06,0L216,196a15.9,15.9,0,0,0,8-13.86V73.86A15.9,15.9,0,0,0,216,60Zm-88,144.1V152H92v34.92L60,168.18V87.82L92,69.08V104h36V51.9l32,18.74v80.28Z";
    const foregroundColor = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim();
    const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="hsl(${backgroundColor})" /><g fill="hsl(${foregroundColor})"><path d="${svgPath}"/></g></svg>`;
    const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
    
    const newFavicon = document.createElement('link');
    newFavicon.rel = 'icon';
    newFavicon.href = svgDataUrl;
    document.head.appendChild(newFavicon);
    
    // --- Cursor Logic ---
    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;

    if (!dot || !outline) return;

    gsap.set([dot, outline], { xPercent: -50, yPercent: -50 });

    const initialX = window.innerWidth * (Math.random() * 0.3 + 0.1);
    const initialY = window.innerHeight * (Math.random() * 0.3 + 0.1);

    const pos = { x: initialX, y: initialY };
    const mouse = { x: initialX, y: initialY };
    const speed = 0.1;

    const xSetDot = gsap.quickSetter(dot, 'x', 'px');
    const ySetDot = gsap.quickSetter(dot, 'y', 'px');
    const xSetOutline = gsap.quickSetter(outline, 'x', 'px');
    const ySetOutline = gsap.quickSetter(outline, 'y', 'px');

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"]';

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(interactiveSelector);

      if (isInteractive) {
        outline.classList.add('is-interactive');
      } else {
        outline.classList.remove('is-interactive');
      }
    };
    
    const handleMouseDown = () => {
        gsap.to(outline, { scale: 0.8, duration: 0.15 });
    };

    const handleMouseUp = () => {
        gsap.to(outline, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
    };

    const ticker = gsap.ticker;
    const render = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSetOutline(pos.x);
      ySetOutline(pos.y);
      xSetDot(mouse.x);
      ySetDot(mouse.y);
    };

    ticker.add(render);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      // Cleanup for all intervals and listeners
      ticker.remove(render);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const mainContentVariants = {
    hidden: {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1], // easeOutQuint
      },
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('antialiased font-sans', inter.variable)}>
        <AnimatePresence>
          {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        <div className="cursor-container">
          <div className="cursor-dot" ref={cursorDotRef} />
          <div className="cursor-outline" ref={cursorOutlineRef} />
        </div>

        <Header />

        <motion.div
          initial="hidden"
          animate={!isLoading ? 'visible' : 'hidden'}
          variants={mainContentVariants}
        >
          <main>
            {children}
          </main>
          {!isHomePage && <Footer />}
        </motion.div>
        
        <Toaster />
      </body>
    </html>
  );
}
