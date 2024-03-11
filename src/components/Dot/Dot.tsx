import classes from './Dot.module.scss';

export const Dot = ({ active }: { active: boolean }) => {
  return (
    <span
      className={`${classes.dot} ${active ? classes.pulse : classes.pulseSlow}`}
    ></span>
  );
};
