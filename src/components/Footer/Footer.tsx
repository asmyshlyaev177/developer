import React from 'react';

import classes from './Footer.module.scss';

const date = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      © asmyshlyaev177 &nbsp;-&nbsp; {date}
    </footer>
  );
};
