'use client';

import { Users } from 'lucide-react';
import { InteractiveCard } from './interactive-card';

export function TeamAnimation() {
  const nodeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'hsl(var(--primary))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 8px hsl(var(--primary))',
    marginTop: '-6px',
    marginLeft: '-6px',
  };

  return (
    <InteractiveCard className="h-full w-full">
      <div
        className="relative flex h-[400px] w-full max-w-lg items-center justify-center rounded-lg border bg-secondary/30 p-8 shadow-2xl backdrop-blur-sm overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          background:
            'radial-gradient(ellipse at center, hsl(var(--secondary) / 0.5) 0%, hsl(var(--background)) 70%)',
        }}
      >
        <div
          className="absolute h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          style={{ transform: 'translateZ(-80px)' }}
        />

        <div
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Central Team Icon */}
          <Users
            className="relative h-24 w-24 text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.7)]"
            strokeWidth={1}
            style={{ transform: 'translateZ(60px)' }}
          />

          {/* Orbiting nodes representing collaboration */}
          <div className="absolute inset-0 w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {/* Orbit 1 */}
            <div
              className="absolute inset-0 animate-spin-slow"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateY(70deg) rotateX(30deg)',
                animationDuration: '12s'
              }}
            >
              <div
                style={{
                  ...nodeStyle,
                  transform: 'translateX(160px)',
                }}
              />
            </div>
            {/* Orbit 2 */}
            <div
              className="absolute inset-0 animate-spin-medium"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-60deg) rotateX(50deg)',
                animationDuration: '9s'
              }}
            >
               <div
                style={{
                  ...nodeStyle,
                  transform: 'translateX(130px)',
                }}
              />
            </div>
            {/* Orbit 3 */}
            <div
              className="absolute inset-0 animate-spin-reverse-slow"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateY(20deg) rotateX(-60deg)',
                animationDuration: '18s'
              }}
            >
              <div
                style={{
                  ...nodeStyle,
                  transform: 'translateX(100px)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
}
