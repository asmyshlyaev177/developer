import React from 'react';

import { useDelay } from './useDelay';

export const useTyping = ({
  text,
  delay = 0,
  interval = 80,
}: {
  text: string;
  delay?: number;
  interval?: number;
}) => {
  const ready = useDelay(delay);
  const [currText, setCurrText] = React.useState('');
  const [cursor, setCursor] = React.useState(0);
  const timeout = React.useRef(0 as unknown as NodeJS.Timeout);

  React.useEffect(() => {
    if (ready && cursor < text.length) {
      timeout.current = setInterval(() => {
        const char = text[cursor];
        setCurrText((cur) => cur + char);
        setCursor((cursor) => cursor + 1);
      }, interval);
    }

    return () => {
      clearInterval(timeout.current);
    };
  }, [ready, cursor, interval, text]);

  return {
    text: currText,
    isRunning: ready && currText.length < text.length,
    isFinished: ready && currText.length === text.length,
  };
};
