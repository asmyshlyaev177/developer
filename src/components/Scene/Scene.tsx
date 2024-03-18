/* eslint-disable no-secrets/no-secrets */
import React from 'react';

import classes from './Scene.module.scss';

import { getProject } from '@theatre/core';
// import studio from '@theatre/studio';

import { Input } from './Input';
import { Checkbox } from './Checkbox';
import { State } from './State';
import { stubCb } from 'helpers';
import { Ball } from './Ball';

import { type Control } from 'types';

type fields = 'field1' | 'field2';

export const Scene = () => {
  const refs = React.useRef<{
    [key in fields]: Control;
  }>({
    field1: { current: { act: stubCb } },
    field2: { current: { act: stubCb } },
  });

  const ballRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // studio.initialize();

    const project = getProject('Ball animation', { state: projectState });
    const sheet = project.sheet('Sheet 1');
    const obj = sheet.object('ball', {
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
        refs.current[`field${obj.field}` as fields]?.current?.act?.();
      }
    });

    project.ready.then(() => {
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 3.5] });
    });
    // TODO: play/pause with intersectionObserver
    // setTimeout(() => {
    //   sheet.sequence.pause();
    //   sheet.sequence.position = 0;
    // }, 5000);
  }, []);

  const [state, setState] = React.useState({
    name: '',
    impressed: false,
  });

  const onUpdate1 = React.useCallback((val: string) => {
    setState((cur) => ({ ...cur, name: val }));
  }, []);

  const onUpdate2 = React.useCallback((val: boolean) => {
    setState((curr) => ({ ...curr, impressed: val }));
  }, []);

  return (
    <section className={classes.container}>
      <div className={classes.scene}>
        <Ball ref={ballRef} />

        <div className={classes.field1}>
          <Input control={refs.current.field1} onUpdate={onUpdate1} />
        </div>

        <div className={classes.field2}>
          <Checkbox
            value={state.impressed}
            control={refs.current.field2}
            onChange={onUpdate2}
          />
        </div>

        <div className={classes.field3}>
          <button>Contact me</button>
        </div>

        <State value={state} />
      </div>
    </section>
  );
};

const projectState = {
  sheetsById: {
    'Sheet 1': {
      staticOverrides: {
        byObject: {
          ball: {
            x: 1,
            y: 0,
          },
        },
      },
      sequence: {
        subUnitsPerUnit: 30,
        length: 10,
        type: 'PositionalSequence',
        tracksByObject: {
          ball: {
            trackData: {
              q0rIZiftdy: {
                type: 'BasicKeyframedTrack',
                __debugName: 'ball:["x"]',
                keyframes: [
                  {
                    id: 'hX843RAzc7',
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.2825638178693358, 0.6841206564536129],
                    type: 'bezier',
                    value: -10,
                  },
                  {
                    id: 'LnmIZQDfK6',
                    position: 0.4,
                    connectedRight: true,
                    handles: [
                      0.5182734003566583, 0.16539947151056145,
                      0.5335365853658538, 0.8701303137372688,
                    ],
                    type: 'bezier',
                    value: 6,
                  },
                  {
                    id: 'VkKYEOPDfZ',
                    position: 1.033,
                    connectedRight: true,
                    handles: [
                      0.7983833346418698, 0.8895626378151495,
                      0.4494408857562848, 0.4814693940574324,
                    ],
                    type: 'bezier',
                    value: 45,
                  },
                  {
                    id: 'Wbr0Zge1tj',
                    position: 1.733,
                    connectedRight: true,
                    handles: [
                      0.515799723201161, 0.9773021571372923, 0.5202204023860075,
                      0.6659838433615002,
                    ],
                    type: 'bezier',
                    value: 88,
                  },
                  {
                    id: 'pjMrAj-oCE',
                    position: 2.3,
                    connectedRight: true,
                    handles: [0.5431166632650447, 0.8530989425141517, 0.5, 0],
                    type: 'bezier',
                    value: 101.28404181824843,
                  },
                ],
              },
              h9H2UZsLR7: {
                type: 'BasicKeyframedTrack',
                __debugName: 'ball:["y"]',
                keyframes: [
                  {
                    id: 'bOQIXUd9nV',
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.1695843615685509, -0.6975662570567738],
                    type: 'bezier',
                    value: -10,
                  },
                  {
                    id: 'tMvMpZg0D6',
                    position: 0.4,
                    connectedRight: true,
                    handles: [
                      0.6953862141448495, -0.07711505753241976,
                      0.20273266508908483, -0.31372881916935136,
                    ],
                    type: 'bezier',
                    value: 0,
                  },
                  {
                    id: 'FF9KnjnvL3',
                    position: 1.033,
                    connectedRight: true,
                    handles: [
                      0.6822176422571253, 0.21022350598320072,
                      0.47472044287814247, -0.5942887229753098,
                    ],
                    type: 'bezier',
                    value: 46,
                  },
                  {
                    id: 'YhuqcNEqwI',
                    position: 1.733,
                    connectedRight: true,
                    handles: [
                      0.8611636155520244, -0.03126572516303755,
                      0.563783482563087, -1.6036880845880959,
                    ],
                    type: 'bezier',
                    value: 88.16329317325838,
                  },
                  {
                    id: 'Yvbgpsgkjy',
                    position: 2.3,
                    connectedRight: true,
                    handles: [0.6891698079980394, -0.3338753457992627, 0.5, 0],
                    type: 'bezier',
                    value: 101,
                  },
                ],
              },
              '40rMNtoC3n': {
                type: 'BasicKeyframedTrack',
                __debugName: 'ball:["field"]',
                keyframes: [
                  {
                    id: 'LS2-2c5rEm',
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: 'bezier',
                    value: '',
                  },
                  {
                    id: '45wj9AOFLw',
                    position: 0.4,
                    connectedRight: true,
                    handles: [0.5, 1, 0.2356867954193596, 0.27624309392265195],
                    type: 'bezier',
                    value: '1',
                  },
                  {
                    id: 'mhdxd_sVk-',
                    position: 0.433,
                    connectedRight: true,
                    handles: [
                      0.37269871635904156, 0.9116022099447514,
                      0.9363493581795208, 0.4861878453038674,
                    ],
                    type: 'bezier',
                    value: '0',
                  },
                  {
                    id: 'Ijdrh6ukbN',
                    position: 1.033,
                    connectedRight: true,
                    handles: [
                      0.6091153859779643, 0.8895027624309393,
                      0.06353845608814296, 0.3812154696132597,
                    ],
                    type: 'bezier',
                    value: '2',
                  },
                  {
                    id: '1JK5vVEvps',
                    position: 1.067,
                    connectedRight: true,
                    handles: [0, 1.0057191368054694, 0.5, 0],
                    type: 'bezier',
                    value: '0',
                  },
                  {
                    id: 'pHPrLbL6bZ',
                    position: 1.733,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: 'bezier',
                    value: '3',
                  },
                  {
                    id: 'Xn2_FesKTe',
                    position: 1.767,
                    connectedRight: true,
                    handles: [0, 1.0071327598354998, 0.5, 0],
                    type: 'bezier',
                    value: '0',
                  },
                ],
              },
            },
            trackIdByPropPath: {
              '["x"]': 'q0rIZiftdy',
              '["y"]': 'h9H2UZsLR7',
              '["field"]': '40rMNtoC3n',
            },
          },
        },
      },
    },
  },
  definitionVersion: '0.4.0',
  revisionHistory: ['bvWnd9o3aavgc4oD', 'VJ4IV_syi9Jx5hJa', '1zGV8Jp9O3itfamd'],
};
