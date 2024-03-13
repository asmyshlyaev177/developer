import React from 'react';

type Cb = (val: string) => void;
type onDone = Cb;
type onReset = () => void;

export type TextEntry = {
  id: string;
  text: string;
  interval: number;
  delay: number;
};

type AnimPromise = () => Promise<{ id: string; char: string }>;
export class Queue {
  arr: TextEntry[];
  stack: AnimPromise[];
  subscriptions: Map<string, [Cb, onDone, onReset]>;
  running: boolean;
  done: boolean;
  count: number;
  queue:
    | undefined
    | AsyncGenerator<{ id: string; value: string; last: boolean }>;
  onDone: () => void;
  constructor(arr: TextEntry[], onDone: () => void) {
    this.arr = arr;
    this.stack = [];
    this.subscriptions = new Map();
    this.running = false;
    this.onDone = onDone;
    this.queue = undefined;
    this.done = false;
    this.count = 0;
  }

  private getNextProm = () => {
    return this.stack.splice(0, 1)[0];
  };

  private notify = (id: string, val: string) => {
    this.subscriptions.get(id)?.[0](val);
  };

  private fillStack = () => {
    this.stack = this.arr.reduce<AnimPromise[]>((acc, val) => {
      const promises: AnimPromise[] = [
        () =>
          new Promise((res) => {
            setTimeout(() => res({ id: val.id, char: '' }), val.delay);
          }),
      ];
      const charPromises: AnimPromise[] = val.text.split('').map(
        (char) => () =>
          new Promise((res) => {
            setTimeout(() => res({ id: val.id, char }), val.interval);
          }),
      );
      const onDone: AnimPromise = () =>
        new Promise((res) =>
          setTimeout(() => {
            this.subscriptions.get(val.id)?.[1]('');
            res({ id: val.id, char: '' });
          }, 100),
        );

      return acc.concat(promises).concat(charPromises).concat([onDone]);
    }, []);
  };

  private execStack = (prom: AnimPromise) => {
    prom &&
      prom?.().then((res) => {
        res.char && this.notify(res.id, res.char);
        return this.execStack(this.getNextProm());
      });

    if (!this.stack.length) {
      this.running = false;
      return this.onDone();
    }
  };

  public run = async () => {
    if (!this.running) {
      this.fillStack();
      this.running = true;
      return this.execStack(this.getNextProm());
    }
  };

  public reset = () => {
    return new Promise((res) => {
      this.running = false;
      this.done = true;
      this.stack = [];
      setTimeout(() => {
        [...this.subscriptions].forEach(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_id, [_cb, _onDone, onReset]]) => {
            onReset?.();
          },
        );
        res(this);
      }, 100);
    });
  };

  // eslint-disable-next-line max-params
  public subscribe = (id: string, cb: Cb, onDone: onDone, onReset: onReset) => {
    this.subscriptions.set(id, [cb, onDone, onReset]);
    return () => {
      this.subscriptions.delete(id);
    };
  };
}

export const useQueue = (texts: TextEntry[]) => {
  const [isAnimating, setIsAnimating] = React.useState(true);
  const queue = React.useRef(new Queue(texts, () => setIsAnimating(false)));
  React.useEffect(() => {
    queue.current.run();
  }, []);

  const reset = React.useCallback(async () => {
    await queue.current.reset();
    setIsAnimating(true);
    queue.current.run();
  }, [queue]);

  const useSubscribe = (id: string) => {
    const [text, setText] = React.useState('');
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
      const cb = (val: string) => {
        setIsAnimating(true);
        setText((curr) => curr + val);
      };
      const onDone = () => {
        setIsAnimating(false);
      };
      const onReset = () => {
        setText('');
        setIsAnimating(false);
      };
      return queue.current.subscribe(id, cb, onDone, onReset);
    }, [id]);

    return { text, isAnimating };
  };

  return { isAnimating, queue, reset, useSubscribe };
};
