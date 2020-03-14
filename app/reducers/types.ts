// 定义：type, payload, action, dispatch
import { Dispatch, Store } from 'redux';

export type User = {
  status: UserStatus;
};

export enum UserStatus {
  UNLOG = 'not-logged',
  LOGGING = 'logging',
  LOGGED = 'logged-in'
}

export const UPDATE_USER = 'UPDATE_USER';

interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: User;
}

export type UserAction = UpdateUserAction;

export type UserDispatch = Dispatch<UserAction>;

export type UserStore = Store<User, UserAction>;
// export type counterStateType = {
//   counter: number;
// };

// export type GetState = () => counterStateType;

// export type Dispatch = ReduxDispatch<Action<string>>;

// export type Store = ReduxStore<counterStateType, Action<string>>;
