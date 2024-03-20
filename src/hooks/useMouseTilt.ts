import React from 'react';

const PERSPECTIVE = 500;

export const useMouseTilt = (perspective: number = PERSPECTIVE) => {
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
      elRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
    }
  }, [perspective]);

  return { elRef, onMouseMove, onMouseLeave };
};

const transformPerspective = (x: number, y: number, el: HTMLElement) => {
  const contstrain = 50;
  const divider = 2.3;
  const box = el.getBoundingClientRect();
  // for y axis
  const newX = -(y - box.y - box.height / 2) / contstrain / divider;
  const newY = (x - box.x - box.width / 2) / contstrain / divider;

  return `perspective(${PERSPECTIVE}px) rotateX(${newX}deg) rotateY(${newY}deg)`;
};
