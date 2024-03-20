import React from 'react';

import classes from './TextTyping.module.scss';

export const TextTyping = ({
  useSubscribe,
  id,
  fullText,
}: {
  useSubscribe: (id: string) => { text: string; isAnimating: boolean };
  id: string;
  // for SEO
  fullText: string;
}) => {
  const { text, isAnimating } = useSubscribe(id);

  return (
    <>
      {text}
      {isAnimating && <span className="caret" />}
      <span className={classes.seoText}>{fullText.slice(text.length)}</span>
    </>
  );
};
