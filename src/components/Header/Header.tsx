import React from 'react';

import classes from './Header.module.scss';
import { ReactComponent as LinkedinIcon } from 'assets/linkedIn-logo.svg';
import { ReactComponent as GithubIcon } from 'assets/github-logo.svg';
import { Icon } from 'components/icon';
import { lineId } from '../../constants';

export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.links}>
        <Link href="https://www.linkedin.com/in/asmyshlyaev177/">
          <Icon>
            <LinkedinIcon />
          </Icon>
        </Link>

        <Link href="https://github.com/asmyshlyaev177">
          <Icon>
            <GithubIcon />
          </Icon>
        </Link>
      </div>

      <div className={classes.lineContainer}>
        <div className={classes.line1}></div>
        <div id={lineId} className={classes.line2}></div>
      </div>
    </header>
  );
};

const Link = ({
  children,
  href,
  target = '_blank',
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
}) => {
  return (
    <a href={href} target={target} rel="noopener">
      {children}
    </a>
  );
};
