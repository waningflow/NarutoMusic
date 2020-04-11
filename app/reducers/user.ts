import { UserStatus, User } from '@/types';
import { UPDATE_USER, UserAction } from '@/store/types';

const initState: User = {
  status: UserStatus.UNLOG,
  userInfo: {}
};

export default function user(state = initState, action: UserAction): User {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
