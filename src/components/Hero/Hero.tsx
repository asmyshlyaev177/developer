import React from 'react';

import classes from './Hero.module.scss';

import { type TextEntry, useQueue } from 'components/Queue';

// TODO: https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/

import { TextTyping } from 'components/TextTyping';
import { Dot } from 'components/Dot';

// Add random delay for every keystroke?
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
  { id: '4', text: 'Scroll down to see more...', interval: 50, delay: 0 },
];

// TODO:
// try this https://github.com/theatre-js/theatre/tree/main/packages/dataverse#tickers
export const Hero = () => {
  const { isAnimating, queue } = useQueue(texts);

  // TODO: css flip animation on Dot click and reset typing last 2 lines

  // TODO: pass Queue through context

  const reset = React.useCallback(() => {
    queue.current.reset();
    queue.current.run();
  }, [queue]);

  return (
    <section className={classes.hero}>
      <div className={classes.block}>
        <Dot active={isAnimating} onClick={reset} />
        <div className={classes['inner-wrapper']}>
          <div>
            <TextTyping id="1" queue={queue} />
            <strong>
              <TextTyping id="2" queue={queue} />
            </strong>
          </div>
          {/*
          <div>
            <TextTyping id="3" queue={queue} />
          </div>

          <div>
            <TextTyping id="4" queue={queue} />
          </div> */}
        </div>
      </div>
    </section>
  );
};
