/*
 ** 因为hash history不支持location.key，
 ** 因此手动设置location.hash，
 ** 来代替location.key
 */
class HistoryStack {
  current: any;

  index: number;

  stack: any[];

  constructor() {
    this.current = null;
    this.index = -1;
    this.stack = [];
  }

  pop(loc: any) {
    if (!this.current || this.stack.length === 0) {
      this.current = loc;
      this.index = 0;
      this.stack = [loc];
    } else {
      const index = this.stack.findIndex(v => v.hash === loc.hash);
      if (index > -1) {
        this.current = this.stack[index];
        this.index = index;
      } else {
        throw new Error('history stack not match!');
      }
    }
  }

  push(loc: any) {
    this.stack.splice(this.index + 1);
    this.stack.push(loc);
    this.current = loc;
    this.index = this.stack.length - 1;
  }

  canGo(num: number) {
    return Boolean(this.stack[this.index + num]);
  }
}

export default new HistoryStack();
