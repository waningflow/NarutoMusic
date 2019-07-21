import { sleep } from '../utils/utils';

export const LOGIN_STATUS_UPDATE = 'LOGIN_STATUS_UPDATE';

export function updateStatus(status: string) {
  return {
    type: LOGIN_STATUS_UPDATE,
    value: status
  };
}

export function login() {
  return async dispatch => {
    dispatch({
      type: LOGIN_STATUS_UPDATE,
      value: 'loging'
    });
    await sleep(1000);
    dispatch({
      type: LOGIN_STATUS_UPDATE,
      value: 'loged'
    });
  };
}
