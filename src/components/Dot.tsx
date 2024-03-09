import classes from './Dot.module.scss';
import { useDelay } from 'hooks/useDelay';

export const Dot = ({ delay }: { delay: number }) => {
  const ready = useDelay(delay);

  return (
    <span
      className={`${classes.dot} ${ready ? classes.pulseSlow : classes.pulse}`}
    ></span>
  );
};
