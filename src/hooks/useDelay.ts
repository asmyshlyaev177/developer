import React from 'react';

export const useDelay = (delay: number) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return ready;
};
