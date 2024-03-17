import React from 'react';

import classes from './State.module.scss';

export const State = ({
  value,
}: {
  value: { [key: string]: string | boolean };
}) => {
  return (
    <div className={classes.container}>
      {Object.entries(value).map((entry, ind) => (
        <div key={ind}>
          {entry[0]}: {JSON.stringify(entry[1])}
        </div>
      ))}
    </div>
  );
};
