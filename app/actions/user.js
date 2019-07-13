export const LOGIN_STATUS_UPDATE = 'LOGIN_STATUS_UPDATE';

export function updateStatus(status: string) {
  return {
    type: LOGIN_STATUS_UPDATE,
    value: status
  };
}

export function login() {
  return dispatch => {
    dispatch({
      type: LOGIN_STATUS_UPDATE,
      value: 'loging'
    });
    setTimeout(() => {
      dispatch({
        type: LOGIN_STATUS_UPDATE,
        value: 'loged'
      });
    }, 1000);
  };
}
