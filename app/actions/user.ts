import { UserStatus, User } from '@/types';
import Logger from '@/utils/logger';
import { UPDATE_USER, UserAction, UserDispatch } from '@/store/types';
import { loginWithCellphone } from '../api';

const log = new Logger('Action User');

function updateUserStatus(status: UserStatus): UserAction {
  return {
    type: UPDATE_USER,
    payload: {
      status
    }
  };
}

function updateUser(user: Partial<User>): UserAction {
  return {
    type: UPDATE_USER,
    payload: user
  };
}

function login(params: any) {
  return async (dispatch: UserDispatch) => {
    dispatch(updateUserStatus(UserStatus.LOGGING));
    try {
      const res = await loginWithCellphone(params);
      dispatch(updateUser({ status: UserStatus.LOGGED, userInfo: res }));
    } catch (e) {
      log.err(e);
      dispatch(updateUserStatus(UserStatus.UNLOG));
    }
  };
}

export { login, updateUser };
