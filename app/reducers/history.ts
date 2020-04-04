import { createHashHistory } from 'history';
import { connectRouter } from 'connected-react-router';

export const history = createHashHistory();

export default connectRouter(history);
