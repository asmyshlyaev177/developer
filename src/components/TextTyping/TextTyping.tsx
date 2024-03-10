import React from 'react';
import { useTyping } from 'hooks/useTyping';

import classes from './TextTyping.module.scss';

export const TextTyping = ({
  text,
  interval = 80,
  delay = 0,
}: {
  text: string;
  interval?: number;
  delay?: number;
}) => {
  const {
    text: animatedText,
    isRunning,
    textToAnimate,
  } = useTyping({
    text,
    interval,
    delay,
  });

  return (
    <>
      {animatedText}
      {isRunning && <span className="caret" />}
      {isRunning && !!textToAnimate && (
        <span className={classes.placeholder}>{textToAnimate}</span>
      )}
    </>
  );
};
