import { UserStatus, UPDATE_USER, UserAction } from './types';

const initState = {
  status: UserStatus.UNLOG
};

export default function user(state = initState, action: UserAction) {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
