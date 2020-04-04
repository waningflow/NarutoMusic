// 定义：type, payload, action, dispatch
import { Dispatch } from 'redux';
import { User, Playlist } from '@/types';

// user
export const UPDATE_USER = 'UPDATE_USER';

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: Partial<User>;
}

export type UserAction = UpdateUserAction;

export type UserDispatch = Dispatch<UserAction>;

// playlist
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';

export interface UpdatePlaylistAction {
  type: typeof UPDATE_PLAYLIST;
  payload: Playlist;
}

export type PlaylistAction = UpdatePlaylistAction;

export type PlaylistDispatch = Dispatch<UpdatePlaylistAction>;
