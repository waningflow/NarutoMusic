// 定义：type, payload, action, dispatch
import { Dispatch, Store } from 'redux';

// user

export type User = {
  status: UserStatus;
  loginType: number;
  account: { [key: string]: any };
  token: string;
  profile: { [key: string]: any };
  bindings: { [key: string]: any }[];
};

export enum UserStatus {
  UNLOG = 'not-logged',
  LOGGING = 'logging',
  LOGGED = 'logged-in'
}

export const UPDATE_USER = 'UPDATE_USER';

interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: Partial<User>;
}

export type UserAction = UpdateUserAction;

export type UserDispatch = Dispatch<UserAction>;

// playlist

type MusicInfo = {
  [key: string]: any;
};

export type Playlist = {
  playingIndex: number;
  playing: MusicInfo;
  list: MusicInfo[];
  paused: boolean;
  currentTime: number;
  reset: number;
};

export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';

interface UpdatePlaylistAction {
  type: typeof UPDATE_PLAYLIST;
  payload: Playlist;
}

export type PlaylistAction = UpdatePlaylistAction;

export type PlaylistDispatch = Dispatch<UpdatePlaylistAction>;

// all

export type State = {
  user: User;
  playlist: Playlist;
};

export type Action = UserAction | PlaylistAction;

export type Store = Store<State, Action>;

// export type counterStateType = {
//   counter: number;
// };

// export type GetState = () => counterStateType;

// export type Dispatch = ReduxDispatch<Action<string>>;

// export type Store = ReduxStore<counterStateType, Action<string>>;
