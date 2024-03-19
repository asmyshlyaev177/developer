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
        <Link
          href="https://www.linkedin.com/in/asmyshlyaev177/"
          label="asmyshlyaev177 linkedin profile"
        >
          <Icon>
            <LinkedinIcon />
          </Icon>
        </Link>

        <Link
          href="https://github.com/asmyshlyaev177"
          label="asmyshlyaev177 github profile"
        >
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
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
  target?: string;
}) => {
  return (
    <a href={href} target={target} rel="noopener" aria-label={label}>
      {children}
    </a>
  );
};
