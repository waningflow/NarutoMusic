import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { history } from '@/reducers/history';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from '@/reducers';

const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

type State = ReturnType<typeof rootReducer>;

function configureStore(initialState?: State) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
