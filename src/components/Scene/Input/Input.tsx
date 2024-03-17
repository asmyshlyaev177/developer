import React from 'react';

import { type Control } from 'types';
import { getRandomArrEl } from 'helpers';
import classes from './Input.module.scss';
import { stubCb } from 'helpers';
import { useTrottle } from 'hooks/useTrottle';

export const Input = ({
  control,
  onUpdate,
}: {
  control: Control;
  onUpdate: (val: string) => void;
}) => {
  const texts = React.useMemo(
    () => [
      { id: '1', text: 'Alex', interval: 50, delay: 0 },
      { id: '2', text: 'John', interval: 50, delay: 0 },
      { id: '3', text: 'Olivia', interval: 50, delay: 0 },
      { id: '4', text: 'Mike', interval: 50, delay: 0 },
      { id: '5', text: 'Emma', interval: 50, delay: 0 },
      { id: '6', text: 'James', interval: 50, delay: 0 },
    ],
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

  return (
    <>
      <label htmlFor="input" className={classes.label}>
        Name
      </label>
      <input
        placeholder="..."
        id="input"
        onChange={stubCb}
        value={value}
      ></input>
    </>
  );
};
