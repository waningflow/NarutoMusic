// import { sleep } from '../utils/utils';
import { loginWithCellphone } from '../api';

export const LOGIN_STATUS_UPDATE = 'LOGIN_STATUS_UPDATE';

export function updateStatus(status: string) {
  return {
    type: LOGIN_STATUS_UPDATE,
    value: status
  };
}

export function login(params) {
  return async dispatch => {
    dispatch({
      type: LOGIN_STATUS_UPDATE,
      value: 'loging'
    });
    // await sleep(1000);
    try {
      const res = await loginWithCellphone(params);
      console.log(res);
      dispatch({
        type: LOGIN_STATUS_UPDATE,
        value: 'loged'
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: LOGIN_STATUS_UPDATE,
        value: 'log_failed'
      });
    }
  };
}
