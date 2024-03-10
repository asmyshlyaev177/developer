import React from 'react';

import classes from './Hero.module.scss';

// TODO: https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/

import { TextTyping } from 'components/TextTyping';
import { Dot } from 'components/Dot';

type TextEntry = { text: string; interval: number; delay: number };

// Add random delay for every keystroke?
const texts: TextEntry[] = [
  // Stub for font load
  { text: '', interval: 80, delay: 700 },
  { text: "Hello, I'm ", interval: 80, delay: 300 },
  { text: 'Alex', interval: 80, delay: 500 },
  { text: 'I am a Javascript Frontend Developer', interval: 50, delay: 300 },
  { text: 'Scroll down to see more...', interval: 50, delay: 0 },
];

const calcDelay = (arr: TextEntry[], index: number) =>
  arr
    .slice(0, index)
    .reduce((acc, val) => acc + val.delay + val.text.length * val.interval, 0);

const dotDelay = calcDelay(texts, texts.length);

// TODO: single state for whole animation
// setInterval isn't reliable enough
// create class and events
// try this https://github.com/theatre-js/theatre/tree/main/packages/dataverse#tickers
export const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.block}>
        <Dot delay={dotDelay} />
        <div className={classes['inner-wrapper']}>
          <div>
            <TextTyping
              text={texts[1].text}
              delay={calcDelay(texts, 1)}
              interval={texts[1].interval}
            />
            <strong>
              <TextTyping
                text={texts[2].text}
                delay={calcDelay(texts, 2)}
                interval={texts[2].interval}
              />
            </strong>
          </div>

          <div>
            <TextTyping
              text={texts[3].text}
              delay={calcDelay(texts, 3)}
              interval={texts[3].interval}
            />
          </div>

          <div>
            <TextTyping
              text={texts[4].text}
              delay={calcDelay(texts, 4)}
              interval={texts[4].interval}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
