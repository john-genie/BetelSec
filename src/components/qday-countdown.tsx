'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const QDayCountdown = () => {
  const [qDay, setQDay] = useState(0);

  useEffect(() => {
    // Set a fixed target date for Q-Day. This ensures the countdown is
    // consistent and does not restart on page reload.
    // Let's set it to January 1, 2030.
    const targetDate = new Date('2030-01-01T00:00:00Z');
    setQDay(targetDate.getTime());
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (qDay === 0) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = qDay - now;

      if (distance < 0) {
        setTimeLeft({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      const years = Math.floor(totalDays / 365);
      const days = totalDays % 365;

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ years, days, hours, minutes, seconds });
    };
    
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [qDay]);

  const AnimatedNumber = ({ value }: { value: number }) => {
    const formattedValue = String(value).padStart(2, '0');
    return (
      <div className="relative h-16 w-14 overflow-hidden sm:h-20 sm:w-16 md:h-28 md:w-24">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center text-4xl font-bold tracking-tighter text-glow sm:text-6xl md:text-8xl"
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
      </div>
    );
  };
  
  const StaticNumber = ({ value }: { value: number }) => {
    const formattedValue = String(value).padStart(2, '0');
    return (
      <div className="relative flex h-16 w-14 items-center justify-center overflow-hidden sm:h-20 sm:w-16 md:h-28 md:w-24">
        <span className="text-4xl font-bold tracking-tighter text-glow sm:text-6xl md:text-8xl">
          {formattedValue}
        </span>
      </div>
    );
  };
  
  const TimeUnit = ({ children, label }: { children: React.ReactNode; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative rounded-lg border bg-secondary/50 p-1 shadow-inner backdrop-blur-sm sm:p-2">
        {children}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
        <div className="absolute inset-0 rounded-lg border border-white/5"></div>
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mt-4 sm:text-sm">{label}</p>
    </div>
  );

  return (
    <div className="flex items-start justify-center gap-1 sm:gap-4 md:gap-6">
      <TimeUnit label="Years">
        <div className="relative flex h-16 w-auto items-center justify-center overflow-hidden px-1 sm:h-20 sm:px-2 md:h-28">
            <span className="text-4xl font-bold tracking-tighter text-glow sm:text-6xl md:text-8xl">
              {timeLeft.years}
            </span>
        </div>
      </TimeUnit>
       <div className="flex h-16 items-center text-4xl font-bold text-muted-foreground sm:h-20 sm:text-6xl md:h-28 md:text-8xl">:</div>
      <TimeUnit label="Days">
        <div className="relative flex h-16 w-auto items-center justify-center overflow-hidden px-1 sm:h-20 sm:px-2 md:h-28">
            <span className="text-4xl font-bold tracking-tighter text-glow sm:text-6xl md:text-8xl">
              {String(timeLeft.days).padStart(3, '0')}
            </span>
        </div>
      </TimeUnit>
       <div className="flex h-16 items-center text-4xl font-bold text-muted-foreground sm:h-20 sm:text-6xl md:h-28 md:text-8xl">:</div>
      <TimeUnit label="Hours">
        <StaticNumber value={timeLeft.hours} />
      </TimeUnit>
       <div className="flex h-16 items-center text-4xl font-bold text-muted-foreground sm:h-20 sm:text-6xl md:h-28 md:text-8xl">:</div>
      <TimeUnit label="Minutes">
        <StaticNumber value={timeLeft.minutes} />
      </TimeUnit>
       <div className="flex h-16 items-center text-4xl font-bold text-muted-foreground sm:h-20 sm:text-6xl md:h-28 md:text-8xl">:</div>
      <TimeUnit label="Seconds">
        <AnimatedNumber value={timeLeft.seconds} />
      </TimeUnit>
    </div>
  );
};

export default QDayCountdown;
