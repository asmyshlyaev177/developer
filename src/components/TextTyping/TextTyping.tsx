import React from 'react';

import { Queue } from 'components/Queue';

export const TextTyping = ({
  queue,
  id,
}: {
  queue: React.MutableRefObject<Queue>;
  id: string;
}) => {
  const [text, setText] = React.useState('');
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    const cb = (val: string) => {
      console.log('CB', val);
      setIsAnimating(true);
      setText((curr) => curr + val);
    };
    const onDone = () => {
      setIsAnimating(false);
      console.log('onDone', { id });
    };
    const onReset = () => {
      setText('');
      setIsAnimating(false);
      console.log('onReset', { id });
    };
    return queue.current.subscribe(id, cb, onDone, onReset);
  }, [id, queue]);

  return (
    <>
      {text}
      {isAnimating && <span className="caret" />}
    </>
  );
};
