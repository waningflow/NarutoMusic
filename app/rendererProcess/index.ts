import { ipcRenderer } from 'electron';
import Logger from '@/utils/logger';

const log = new Logger('RendererProcess');

ipcRenderer.on('cookieChanged', (e, val) => {
  log.info('ipc received cookieChanged ', val);
  localStorage.setItem('N_Cookie', JSON.stringify(val));
});
