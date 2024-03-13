import React from 'react';

import classes from './Hero.module.scss';

import { type TextEntry, useQueue } from 'components/Queue';

// TODO: https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/

import { TextTyping } from 'components/TextTyping';
import { Dot } from 'components/Dot';

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

// TODO: try this https://github.com/theatre-js/theatre/tree/main/packages/dataverse#tickers
export const Hero = () => {
  const { isAnimating, reset, useSubscribe } = useQueue(texts);

  return (
    <section className={classes.hero}>
      <div className={classes.block}>
        <Dot active={isAnimating} onClick={reset} />
        <div className={classes['inner-wrapper']}>
          <div>
            <TextTyping id="1" useSubscribe={useSubscribe} />
            <strong>
              <TextTyping id="2" useSubscribe={useSubscribe} />
            </strong>
          </div>

          <div>
            <TextTyping id="3" useSubscribe={useSubscribe} />
          </div>

          <div>
            <TextTyping id="4" useSubscribe={useSubscribe} />
          </div>
        </div>
      </div>
    </section>
  );
};
