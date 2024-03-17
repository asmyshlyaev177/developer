import React from 'react';

const PERSPECTIVE = '500';

export const useMouseTilt = () => {
  const elRef = React.useRef<HTMLDivElement | null>(null);

  const onMouseMove = React.useCallback(
    (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const { clientX, clientY } = ev;
      if (elRef.current) {
        elRef.current.style.transform = transformPerspective(
          clientX,
          clientY,
          elRef.current,
        );
      }
    },
    [],
  );

  const onMouseLeave = React.useCallback(() => {
    if (elRef.current) {
      elRef.current.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg)`;
    }
  }, []);

  return { elRef, onMouseMove, onMouseLeave };
};

const transformPerspective = (x: number, y: number, el: HTMLElement) => {
  const contstrain = 50;
  const box = el.getBoundingClientRect();
  const newX = (-(y - box.y - box.height / 2) / contstrain) * 4;
  const newY = (x - box.x - box.width / 2) / contstrain;

  return `perspective(${PERSPECTIVE}px) rotateX(${newX}deg) rotateY(${newY}deg)`;
};
