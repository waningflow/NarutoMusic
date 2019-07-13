import { LOGIN_STATUS_UPDATE } from '../actions/user';

const initState = {
  status: 'unloged'
};

export default function counter(state = initState, action) {
  switch (action.type) {
    case LOGIN_STATUS_UPDATE:
      return Object.assign({}, state, { status: action.value });
    default:
      return state;
  }
}
