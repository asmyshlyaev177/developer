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

async function* textTyper(text: string, interval: number) {
  if (!text.length) {
    yield undefined;
  }
  for (const char of text.split('')) {
    await new Promise((res) => setTimeout(res, interval));
    yield char;
  }
}

// TODO: use promises with returning a class and get rid of generators?
async function* textQueue(arr: TextEntry[]) {
  for (let i = 0; i < arr.length; i++) {
    const entry = arr[i];
    const typer = textTyper(entry.text, entry.interval);

    // TODO: return promise with setTimeout from yield
    await new Promise((res) => setTimeout(res, entry.delay));

    let done = false;
    while (!done) {
      const res = await typer.next();
      done = !!res.done;
      yield { id: entry.id, value: res.value || '', last: done };
    }
  }
}

// TODO: just put promises with desired resolved values in a stack
// easy to manage
export class Queue {
  arr: TextEntry[];
  subscriptions: Map<string, [Cb, onDone, onReset]>;
  running: boolean;
  done: boolean;
  queue:
    | undefined
    | AsyncGenerator<{ id: string; value: string; last: boolean }>;
  onDone: () => void;
  constructor(arr: TextEntry[], onDone: () => void) {
    this.arr = arr;
    this.subscriptions = new Map();
    this.running = false;
    this.onDone = onDone;
    this.queue = undefined;
    this.done = false;
  }

  public run = async () => {
    if (this.running) {
      return false;
    }
    this.running = true;
    this.queue = textQueue(this.arr);

    // TODO: need way to cancel promises
    while (!this.done) {
      const res = await this.queue.next();
      this.done = !!res.done;
      const id = res.value?.id;
      const value = res.value?.value;
      const last = res.value?.last;
      const [cb, onDone] = (id && this.subscriptions.get(id)) || [];
      if (value) {
        cb?.(value);
      }
      last && onDone?.();
    }
    this.running = false;
    this.onDone();
  };

  public reset = () => {
    return new Promise((res) => {
      res(
        (() => {
          this.running = false;
          this.done = true;
          setTimeout(() =>
            [...this.subscriptions].forEach(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ([_id, [_cb, _onDone, onReset]]) => {
                onReset?.();
              },
              0,
            ),
          );
        })(),
      );
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

  // // TODO: use context?
  // const useQueueEntry = React.useCallback(() => {
  //   const [text, setText] = React.useState('');
  //   const [isAnimating, setIsAnimating] = React.useState(false);

  //   React.useEffect(() => {
  //     const cb = (val: string) => {
  //       setIsAnimating(true);
  //       setText((curr) => curr + val);
  //     };
  //     const onDone = () => setIsAnimating(false);
  //     return queue.current.subscribe(id, cb, onDone);
  //   }, [id, queue]);
  // }, []);

  return { isAnimating, queue };
};
