'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const preloaderElement = document.querySelector('.preloader');
    
    if (!preloaderElement) return;

    const letters = gsap.utils.toArray('.letter');
    const progressBarInner = document.querySelector('.progress-bar-inner');
    const preloaderContent = document.querySelector('.preloader-content');

    const tl = gsap.timeline({
        onComplete: onComplete,
    });

    // 1. Animate letters in
    tl.to(letters, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        duration: 0.8
    })
    // 2. Animate progress bar
    .to(progressBarInner, {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
    }, '+=0.2')
    // 3. "Suck in" collapse of the content
    .to(preloaderContent, {
        scale: 0,
        duration: 0.7,
        ease: 'power2.in',
    }, '+=0.8')
    // 4. Fade out entire preloader as it collapses
    .to(preloaderElement, {
      opacity: 0,
      duration: 0.6,
      ease: 'none',
      onComplete: () => {
        if (preloaderElement) {
            (preloaderElement as HTMLElement).style.display = 'none';
        }
      }
    }, '-=0.6');

  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground overflow-hidden p-4">
      <div className="preloader-content relative z-10 flex w-full max-w-xs sm:max-w-md flex-col items-center gap-4">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-wider sm:tracking-widest">
          {'Betelsec'.split('').map((char, index) => (
            <span
              key={index}
              className="letter inline-block opacity-0"
              style={{ transform: 'translateY(20px)' }}
            >
              {char}
            </span>
          ))}
        </h1>
        <div className="progress-bar h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="progress-bar-inner h-full w-0 bg-foreground"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
