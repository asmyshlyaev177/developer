import React from 'react';

export const useTrottle = (cb: (val?: boolean) => void, timeout = 500) => {
  const changed = React.useRef(false);

  return React.useCallback(
    (val?: boolean) => {
      if (changed.current) {
        return false;
      }
      changed.current = true;
      cb?.(val);
      setTimeout(() => {
        changed.current = false;
      }, timeout);
    },
    [cb, timeout],
  );
};
