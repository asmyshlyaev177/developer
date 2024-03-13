import React from 'react';

export const TextTyping = ({
  useSubscribe,
  id,
}: {
  useSubscribe: (id: string) => { text: string; isAnimating: boolean };
  id: string;
}) => {
  const { text, isAnimating } = useSubscribe(id);

  return (
    <>
      {text}
      {isAnimating && <span className="caret" />}
    </>
  );
};
