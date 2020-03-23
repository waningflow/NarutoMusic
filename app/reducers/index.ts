import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import user from './user';
import playlist from './playlist';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    user,
    playlist
  });
}
