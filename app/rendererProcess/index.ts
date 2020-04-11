import { ipcRenderer } from 'electron';
import Logger from '@/utils/logger';
import { Cookie } from '@/types';
import { lsKey } from '@/constants/const';
import { hanndleCookieChange } from './auth';

const log = new Logger('RendererProcess');

ipcRenderer.on('cookieChanged', (_: any, val: Cookie[]) => {
  log.info('ipc received cookieChanged ', val);
  localStorage.setItem(lsKey.Cookie, JSON.stringify(val));
  hanndleCookieChange(val);
});
