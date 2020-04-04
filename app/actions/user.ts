import { UserStatus, User } from '@/types';
import Logger from '@/utils/logger';
import { UPDATE_USER, UserAction, UserDispatch } from '@/store/types';
import { loginWithCellphone } from '../api';

const log = new Logger('Action User');

function updateUserStatus(status: UserStatus) {
  return {
    type: UPDATE_USER,
    payload: {
      status
    }
  };
}

function updateUser(user: Partial<User>) {
  return {
    type: UPDATE_USER,
    payload: user
  };
}

function login(params: any) {
  return async (dispatch: UserDispatch) => {
    dispatch(updateUserStatus(UserStatus.LOGGING));
    // await sleep(1000);
    try {
      const res = await loginWithCellphone(params);
      delete res.code;
      dispatch(updateUser({ status: UserStatus.LOGGED, ...res }));
    } catch (e) {
      log.err(e);
      dispatch(updateUserStatus(UserStatus.UNLOG));
    }
  };
}

export { login };
