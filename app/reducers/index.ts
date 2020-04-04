import { combineReducers, Store as ReduxStore, Action } from 'redux';
import router from './history';
import user from './user';
import playlist from './playlist';

const rootReducer = combineReducers({
  router,
  user,
  playlist
});
export default rootReducer;

export type State = ReturnType<typeof rootReducer>;

export type Store = ReduxStore<State, Action<string>>;
