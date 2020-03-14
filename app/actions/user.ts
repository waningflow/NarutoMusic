import {
  UPDATE_USER,
  UserStatus,
  UserAction,
  UserDispatch
} from '../reducers/types';

import { loginWithCellphone } from '../api';

export function updateUserStatus(status: UserStatus): UserAction {
  return {
    type: UPDATE_USER,
    payload: {
      status
    }
  };
}

export function login(params: any) {
  return async (dispatch: UserDispatch) => {
    dispatch(updateUserStatus(UserStatus.LOGGING));
    // await sleep(1000);
    try {
      await loginWithCellphone(params);
      dispatch(updateUserStatus(UserStatus.LOGGED));
    } catch (e) {
      dispatch(updateUserStatus(UserStatus.UNLOG));
    }
  };
}
