export const LOGIN_STATUS_UPDATE = 'LOGIN_STATUS_UPDATE';

export function updateStatus(status: string) {
  return {
    type: LOGIN_STATUS_UPDATE,
    value: status
  };
}
