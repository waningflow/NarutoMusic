import { Action } from 'redux';
import { LOGIN_STATUS_UPDATE } from '../actions/user';

const initState = {
  status: 'unloged'
};

export default function user(state = initState, action: Action<string>) {
  switch (action.type) {
    case LOGIN_STATUS_UPDATE:
      return { ...state, status: action.value };
    default:
      return state;
  }
}
