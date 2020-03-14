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

export { sleep, deepcopy, mockApi };
