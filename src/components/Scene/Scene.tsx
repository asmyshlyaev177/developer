/* eslint-disable no-secrets/no-secrets */
import React from 'react';

import classes from './Scene.module.scss';

import { ISheet, getProject } from '@theatre/core';
// import studio from '@theatre/studio';

import { Input } from './Input';
import { Checkbox } from './Checkbox';
import { stubCb } from 'helpers';
import { Ball } from './Ball';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import projectState from './projectState.json';

import { type Control } from 'types';
import { lineId } from '../../constants';

type fields = 'field1' | 'field2';

export const Scene = () => {
  const refs = React.useRef<{
    [key in fields]: Control;
  }>({
    field1: { current: { act: stubCb } },
    field2: { current: { act: stubCb } },
  });

  const ballRef = React.useRef<HTMLDivElement | null>(null);

  const { ref: sceneRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.7,
  });

  const sheet = React.useRef<ISheet | null>(null);

  React.useEffect(() => {
    // studio.initialize();

    const project = getProject('Ball animation', { state: projectState });
    sheet.current = project.sheet('Sheet 1');
    const obj = sheet.current.object('ball', {
      x: -10,
      y: -10,
      field: '',
    });

    obj.onValuesChange((obj) => {
      if (!ballRef.current) {
        return false;
      }
      ballRef.current.style.left = `${obj.x}%`;
      ballRef.current.style.top = `${obj.y}%`;
      if (obj.field) {
        if (obj.field === '1') {
          refs.current.field1.current?.act?.();
          refs.current.field2.current?.act?.(false);
        }
        if (obj.field === '2') {
          refs.current.field2.current?.act?.(true);
        }
      }
    });
  }, []);

  React.useEffect(() => {
    if (!sheet.current) {
      return () => {};
    }
    if (isIntersecting) {
      sheet.current.sequence.play({
        iterationCount: Infinity,
        range: [0, 3.8],
        rate: 0.8,
      });
    } else {
      sheet.current.sequence.pause();
      sheet.current.sequence.position = 0;
    }
  }, [isIntersecting]);

  const [state, setState] = React.useState({
    skill: '',
    canDo: false,
  });

  const onUpdate1 = React.useCallback((val: string) => {
    setState((cur) => ({ ...cur, skill: val }));
  }, []);

  const onUpdate2 = React.useCallback((val: boolean) => {
    setState((curr) => ({ ...curr, canDo: val }));
  }, []);

  const triggerAnimation = React.useCallback(() => {
    const line = document.getElementById(lineId);

    if (line) {
      line.style.animation = '1s ease 0s 3 linePulse';
      setTimeout(() => {
        line.style.animation = '';
      }, 1000);
    }
  }, []);

  return (
    <section className={classes.container}>
      <div className={classes.innerContainer} ref={sceneRef}>
        <div className={classes.scene}>
          <Ball ref={ballRef} />

          <div className={classes.field1}>
            <Input control={refs.current.field1} onUpdate={onUpdate1} />
          </div>

          <div className={classes.field2}>
            <Checkbox
              value={state.canDo}
              control={refs.current.field2}
              onChange={onUpdate2}
            />
          </div>

          <div className={classes.field3}>
            <button onClick={triggerAnimation}>Contact me</button>
          </div>
        </div>
      </div>
    </section>
  );
};
