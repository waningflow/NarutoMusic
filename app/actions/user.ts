import { Dispatch } from '../reducers/types';

import { loginWithCellphone } from '../api';

export const LOGIN_STATUS_UPDATE = 'LOGIN_STATUS_UPDATE';

export function updateStatus(status: string) {
  return {
    type: LOGIN_STATUS_UPDATE,
    value: status
  };
}

export function login(params: any) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: LOGIN_STATUS_UPDATE,
      value: 'loging'
    });
    // await sleep(1000);
    try {
      await loginWithCellphone(params);
      // console.log(res);
      dispatch({
        type: LOGIN_STATUS_UPDATE,
        value: 'loged'
      });
    } catch (e) {
      // console.log(e);
      dispatch({
        type: LOGIN_STATUS_UPDATE,
        value: 'log_failed'
      });
    }
  };
}
