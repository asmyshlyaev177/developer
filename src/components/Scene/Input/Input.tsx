import React from 'react';

import { type Control } from 'types';
import { getRandomArrEl } from 'helpers';
import classes from './Input.module.scss';
import { stubCb } from 'helpers';
import { useTrottle } from 'hooks/useTrottle';

const WORDS = [
  'Typescript',
  'Javascript',
  'React.js',
  'Next.js',
  'Scss',
  'TDD',
  'git',
  'HTML',
];

export const Input = ({
  control,
  onUpdate,
}: {
  control: Control;
  onUpdate: (val: string) => void;
}) => {
  const texts = React.useMemo(
    () =>
      WORDS.map((text, ind) => ({
        id: String(ind + 1),
        text,
        interval: 50,
        delay: 0,
      })),
    [],
  );

  const [value, _setValue] = React.useState(() => getRandomArrEl(texts).text);
  const setValue = React.useCallback(() => {
    _setValue((curr) => {
      return getRandomArrEl(texts.filter((el) => el.text !== curr)).text;
    });
  }, [texts]);

  const animate = useTrottle(setValue);

  React.useEffect(() => {
    if (control?.current) {
      control.current.act = animate;
    }
  }, [control, animate]);

  React.useEffect(() => {
    onUpdate?.(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // TODO: get rid of label
  // can't figure out something for label
  return (
    <>
      <label htmlFor="input" className={classes.label}>
        Skill
      </label>
      <input
        className={classes.input}
        placeholder="..."
        id="input"
        onChange={stubCb}
        value={value}
      ></input>
    </>
  );
};
