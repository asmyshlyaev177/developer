type Cb = (val: string) => void;

export type TextEntry = {
  id: string;
  text: string;
  interval: number;
  delay: number;
};

async function* textTyper(text: string, delay: number) {
  if (!text.length) {
    yield undefined;
  }
  for (const char of text.split('')) {
    await new Promise((res) => setTimeout(res, delay));
    yield char;
  }
}

async function* textQueue(arr: TextEntry[]) {
  for (let i = 0; i < arr.length; i++) {
    const entry = arr[i];
    const typer = textTyper(entry.text, entry.interval);

    await new Promise((res) => setTimeout(res, entry.delay));

    let done = false;
    while (!done) {
      const res = await typer.next();
      done = !!res.done;
      yield { id: entry.id, value: res.value || '', last: done };
    }
  }
}

export class Queue {
  arr: TextEntry[];
  subscriptions: Map<string, [Cb, Cb]>;
  running: boolean;
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
  }

  public run = async () => {
    if (this.running) {
      return false;
    }
    this.running = true;
    this.queue = textQueue(this.arr);

    let done = false;
    while (!done) {
      const res = await this.queue.next();
      done = !!res.done;
      const id = res.value?.id;
      const value = res.value?.value;
      const last = res.value?.last;
      const [cb, onDone] = (id && this.subscriptions.get(id)) || [];
      value && cb?.(value);
      last && onDone?.();
    }
    this.running = false;
    this.onDone();
  };

  // eslint-disable-next-line max-params
  public subscribe = (id: string, cb: Cb, onDone: Cb) => {
    this.subscriptions.set(id, [cb, onDone]);
    return () => {
      this.subscriptions.delete(id);
    };
  };
}
