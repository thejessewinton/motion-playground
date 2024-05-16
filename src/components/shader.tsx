'use client';

import { CSSProperties } from 'react';

export const Shader = () => {
  const cols = 50;
  const n = 800;
  const rows = Math.ceil(n / cols);

  const word = 'verse.';

  return (
    <div
      className="grid text-xs font-mono grid-cols-[repeat(var(--cols),_1fr)] gap-x-2"
      style={
        {
          '--cols': cols,
        } as CSSProperties
      }
    >
      {Array.from({ length: n }).map((_, i) => {
        return (
          <div
            className="shader"
            key={i}
            style={
              {
                '--x': ((i + 1) % cols) / cols,
                '--y': (rows - Math.floor(i / cols)) / rows,
              } as CSSProperties
            }
          >
            {word.split('')[i % 6]}
          </div>
        );
      })}
    </div>
  );
};
