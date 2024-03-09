import React from 'react';
import { useTyping } from 'hooks/useTyping';

export const TextTyping = ({
  text,
  interval = 80,
  delay = 0,
}: {
  text: string;
  interval?: number;
  delay?: number;
}) => {
  const { text: animatedText, isRunning } = useTyping({
    text,
    interval,
    delay,
  });

  return (
    <>
      {animatedText}
      {isRunning && <span className="caret" />}
    </>
  );
};
