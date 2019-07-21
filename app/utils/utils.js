function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function deepcopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export { sleep, deepcopy };
