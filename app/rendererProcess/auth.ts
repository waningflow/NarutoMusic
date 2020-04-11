import { lsKey } from '@/constants/const';
import { lsGet, lsSet } from '@/utils/utils';
import Logger from '@/utils/logger';
import { loginStatus } from '@/api/api';
import { updateUser } from '@/actions/user';
import { Cookie, UserStatus } from '@/types';

const log = new Logger('Auth Service');

function hanndleCookieChange(cookie: Cookie[]) {
  // const index = cookie.findIndex(v => v.name === sessionKey.MUSIC_U);
  // if (index > -1) {
  //   // 有session
  //   const userInfo = lsGet(lsKey.USER_INFO);
  // } else {
  //   // 没有session
  // }
}

async function refreshUserInfo(dispatch: any) {
  const userInfo = lsGet(lsKey.USER_INFO);
  log.info(userInfo);
  if (userInfo) {
    dispatch(updateUser({ status: UserStatus.LOGGED, userInfo }));
  } else {
    try {
      const res = await loginStatus();
      lsSet(lsKey.USER_INFO, res);
      dispatch(updateUser({ status: UserStatus.LOGGED, userInfo: res }));
    } catch (e) {
      log.err(e);
      dispatch(updateUser({ status: UserStatus.UNLOG, userInfo: {} }));
    }
  }
}

export { hanndleCookieChange, refreshUserInfo };
