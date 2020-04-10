function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function deepcopy(obj = {}) {
  return JSON.parse(JSON.stringify(obj));
}

function mockApi(data: any, time = 1500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

function num2str(initNum = 0, d = 2) {
  let num = initNum;
  for (let i = 0; i < d; i += 1) {
    num /= 10;
  }
  return num.toFixed(d).slice(-d);
}

function parseTime(ts = 0) {
  const min = Math.floor(ts / 60);
  const sec = Math.floor(ts % 60);
  return `${num2str(min)}:${num2str(sec)}`;
}

function findNext<T>(
  list: T[] = [],
  val: string | number,
  i = 1,
  loop = true
): T | null {
  const { length } = list;
  const index = list.indexOf(val);
  if (index === -1) return list[0];
  const nIndex = index + i;
  if (nIndex < length) return list[nIndex];
  if (loop) return list[0];
  return null;
}

export { sleep, deepcopy, mockApi, parseTime, num2str, findNext };
