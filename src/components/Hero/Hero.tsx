import React from 'react';

import classes from './Hero.module.scss';

import { type TextEntry, useQueue } from 'components/Queue';

import { TextTyping } from 'components/TextTyping';
import { Dot } from 'components/Dot';
import { useMouseTilt } from 'hooks/useMouseTilt';

const texts: TextEntry[] = [
  // Stub for font load
  { id: '0', text: '', interval: 80, delay: 700 },
  { id: '1', text: "Hello, I'm ", interval: 80, delay: 200 },
  { id: '2', text: 'Alex', interval: 80, delay: 500 },
  {
    id: '3',
    text: 'I am a Javascript Frontend Developer',
    interval: 50,
    delay: 300,
  },
  { id: '4', text: 'Specializing in ', interval: 50, delay: 0 },
  { id: '5', text: 'React.js', interval: 50, delay: 0 },
];

export const Hero = () => {
  const { isAnimating, reset, useSubscribe } = useQueue(texts);

  const { elRef, onMouseMove, onMouseLeave } = useMouseTilt();

  return (
    <section className={classes.hero}>
      <div className={classes.block}>
        <Dot active={isAnimating} onClick={reset} />
        <div
          className={classes['inner-wrapper']}
          ref={elRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <div>
            <TextTyping
              id="1"
              useSubscribe={useSubscribe}
              fullText={texts[1].text}
            />
            <strong>
              <TextTyping
                id="2"
                useSubscribe={useSubscribe}
                fullText={texts[2].text}
              />
            </strong>
          </div>

          <div>
            <TextTyping
              id="3"
              useSubscribe={useSubscribe}
              fullText={texts[3].text}
            />
          </div>

          <div>
            <TextTyping
              id="4"
              useSubscribe={useSubscribe}
              fullText={texts[4].text}
            />
            <strong>
              <TextTyping
                id="5"
                useSubscribe={useSubscribe}
                fullText={texts[5].text}
              />
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
};
