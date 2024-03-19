export function getRandomArrEl<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const stubCb = (_param?: unknown) => false;
