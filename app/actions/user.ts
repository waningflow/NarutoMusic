import {
  UPDATE_USER,
  UserStatus,
  UserAction,
  UserDispatch
} from '../reducers/types';

import { loginWithCellphone } from '../api';

function updateUserStatus(status: UserStatus): UserAction {
  return {
    type: UPDATE_USER,
    payload: {
      status
    }
  };
}

function updateUser(user: any): UserAction {
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
      console.log(e);
      dispatch(updateUserStatus(UserStatus.UNLOG));
    }
  };
}

export { login };
