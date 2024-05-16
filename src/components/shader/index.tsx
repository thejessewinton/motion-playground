// initial inspiration borrowed from https://svelte.dev/repl/f16e934ff95f409fbcebb254e9df46ba?version=4.2.17

import '~/components/shader/shader.css';

import { CSSProperties } from 'react';

export const Shader = () => {
  const cols = 50;
  const n = 800;
  const rows = Math.ceil(n / cols);

  const word = 'appwrite.';

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
            className="character"
            key={i}
            style={
              {
                '--x': ((i + 1) % cols) / cols,
                '--y': (rows - Math.floor(i / cols)) / rows,
              } as CSSProperties
            }
          >
            {word.split('')[i % word.length]}
          </div>
        );
      })}
    </div>
  );
};
