import React from 'react';

export function getRandomArrEl<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const stubCb = () => false;

export const useTrottle = (cb: () => void, timeout = 500) => {
  const changed = React.useRef(false);

  return React.useCallback(() => {
    if (changed.current) {
      return false;
    }
    changed.current = true;
    cb?.();
    setTimeout(() => {
      changed.current = false;
    }, timeout);
  }, [cb, timeout]);
};
