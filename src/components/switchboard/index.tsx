// initial inspiration from nextjs.org

'use client';

import '~/components/switchboard/switchboard.css';

import { CSSProperties, useEffect, useRef } from 'react';

export const Switchboard = () => {
  const rows = 5;
  const columns = 10;
  const transitionDuration = 250;

  const indices = [5, 15, 19, 29, 26, 34, 46, 55, 60, 67, 70, 74, 79, 83];
  const states = ['off', 'medium', 'high'] as const;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutIds: Array<NodeJS.Timeout> = [];

    const interval = setInterval(() => {
      indices.forEach((index) => {
        const light = ref.current?.querySelector(
          `[data-index="${index}"]`
        ) as HTMLElement;

        if (!light) return;

        const nextState = states[Math.floor(Math.random() * states.length)];
        const currentState = light.dataset.state;

        const pulse =
          Math.random() > 0.2 &&
          // Make sure we only pulsate going from "off" → "medium" → "high"
          ((currentState === 'off' && nextState === 'high') ||
            (currentState === 'off' && nextState === 'medium') ||
            (currentState === 'medium' && nextState === 'high'));

        if (pulse) {
          const delay = getRandomNumber(100, 500);

          timeoutIds.push(
            setTimeout(() => {
              light.style.transform = 'scale(2)';
            }, delay)
          );
        }

        if (currentState === 'high' && nextState === 'medium' && pulse) {
          light.dataset.state = 'off';
        } else {
          light.dataset.state = nextState;
        }
      });

      return () => {
        clearInterval(interval);
        timeoutIds.forEach(clearTimeout);
      };
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="w-[340px] h-[100px] bg-neutral-900 p-4"
      style={{
        display: 'grid',
        gap: `${columns}px`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {Array.from({ length: columns * rows }).map((_, i) => {
        return (
          <div
            key={i}
            className="light"
            data-state="off"
            data-index={i}
            style={
              {
                '--transition-duration': `${transitionDuration}ms`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
