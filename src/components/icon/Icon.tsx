import React from 'react';

import classes from './Icon.module.scss';

export const Icon = ({ children }: { children: React.ReactNode }) => {
  return <div className={classes.container}>{children}</div>;
};
