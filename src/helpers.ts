export function getRandomArrEl<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const stubCb = () => false;
