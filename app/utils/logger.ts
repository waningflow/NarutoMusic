/* eslint-disable no-console */
import { isObject } from 'lodash';

class Logger {
  private module: string;

  constructor(module: string) {
    this.module = module || 'Logger';
  }

  private formatMsg(msg: any[]) {
    let result = `[${this.module}]`;
    msg.forEach(v => {
      if (isObject(v)) {
        result += ` ${JSON.stringify(v)}`;
      } else {
        result += ` ${v}`;
      }
    });
    return result;
  }

  info(...msg: any[]) {
    console.log(`[${this.module}]`, ...msg);
  }

  err(...msg: any[]) {
    console.error(`[${this.module}]`, ...msg);
  }
}

export default Logger;
