import React from 'react';

import classes from './Container.module.scss';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <main className={classes.container}>{children}</main>;
};
