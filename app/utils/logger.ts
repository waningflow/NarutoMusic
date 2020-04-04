/* eslint-disable no-console */
class Logger {
  private module: string;

  constructor(module: string) {
    this.module = module || 'log';
  }

  info(...msg: any[]) {
    console.log(`[${this.module}]`, msg.join(' '));
  }

  err(...msg: any[]) {
    console.error(`[${this.module}]`, msg.join(' '));
  }
}

export default Logger;
