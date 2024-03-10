import React from 'react';

import classes from './Hero.module.scss';

// TODO: https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/

import { TextTyping } from 'components/TextTyping';
import { Dot } from 'components/Dot';

type TextEntry = { text: string; interval: number; delay: number };

const texts: TextEntry[] = [
  { text: "Hello, I'm ", interval: 80, delay: 0 },
  { text: 'Alex', interval: 80, delay: 500 },
  { text: 'I am a Javascript Frontend Developer', interval: 50, delay: 300 },
  { text: 'Scroll down to see more...', interval: 50, delay: 0 },
];

const calcDelay = (arr: TextEntry[], index: number) =>
  arr
    .slice(0, index)
    .reduce((acc, val) => acc + val.delay + val.text.length * val.interval, 0);

const dotDelay = calcDelay(texts, texts.length);

export const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.block}>
        <Dot delay={dotDelay} />
        <div className={classes['inner-wrapper']}>
          <div>
            <TextTyping
              text={texts[0].text}
              delay={calcDelay(texts, 0)}
              interval={texts[0].interval}
            />
            <strong>
              <TextTyping
                text={texts[1].text}
                delay={calcDelay(texts, 1)}
                interval={texts[1].interval}
              />
            </strong>
          </div>

          <div>
            <TextTyping
              text={texts[2].text}
              delay={calcDelay(texts, 2)}
              interval={texts[2].interval}
            />
          </div>

          <div>
            <TextTyping
              text={texts[3].text}
              delay={calcDelay(texts, 3)}
              interval={texts[3].interval}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
