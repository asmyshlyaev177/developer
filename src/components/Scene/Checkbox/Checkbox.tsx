import React from 'react';

import { type Control } from 'types';
import { useTrottle } from 'helpers';
import classes from './Checkbox.module.scss';

export const Checkbox = ({
  value,
  onChange,
  control,
}: {
  value: boolean;
  onChange: (val: boolean) => void;
  control: Control;
}) => {
  const act = React.useCallback(() => {
    onChange(!value);
  }, [onChange, value]);

  const cb = useTrottle(act);

  React.useEffect(() => {
    if (control?.current) {
      control.current.act = cb;
    }
  }, [control, cb]);

  const onChangeHandler = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onChange(ev.target.checked);
    },
    [onChange],
  );

  return (
    <div className={classes.container}>
      <input
        id="checkbox"
        type="checkbox"
        checked={value}
        onChange={onChangeHandler}
        className={classes.input}
      />
      <label htmlFor="checkbox" className={classes.label}>
        <span>Impressed?</span>
      </label>
    </div>
  );
};
