import React from 'react';

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
