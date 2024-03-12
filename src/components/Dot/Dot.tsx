import classes from './Dot.module.scss';

export const Dot = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <span
      onClick={onClick}
      className={`${classes.dot} ${active ? classes.pulse : classes.pulseSlow}`}
    ></span>
  );
};
