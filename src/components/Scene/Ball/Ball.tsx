import React from 'react';

import classes from './Ball.module.scss';

export const Ball = React.forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div className={classes.ball} ref={ref}>
      <div className={classes.clipCircle}>
        <div className={classes.wrapper}></div>
      </div>
      <div className={classes.circle}></div>
    </div>
  );
});
