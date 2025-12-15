import React, { useEffect, useState } from 'react';

const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Generate a fixed number of snowflakes on mount to avoid hydration issues or constant re-renders
    const count = 30;
    const flakes = Array.from({ length: count }, (_, i) => i);
    setSnowflakes(flakes);
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((i) => {
        const left = Math.random() * 100 + '%';
        const animDelay = Math.random() * 10 + 's';
        const animDuration = Math.random() * 5 + 5 + 's';
        const opacity = Math.random() * 0.5 + 0.3;
        const size = Math.random() * 1 + 0.5 + 'em';

        return (
          <div
            key={i}
            className="snowflake"
            style={{
              left: left,
              animationDelay: animDelay,
              animationDuration: animDuration,
              opacity: opacity,
              fontSize: size
            }}
          >
            ❄
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Snowfall);
