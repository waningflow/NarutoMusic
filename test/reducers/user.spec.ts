import user from '../../app/reducers/user';
import { UPDATE_USER, UserStatus } from '../../app/reducers/types';

describe('reducers', () => {
  describe('user', () => {
    it('should handle initial state', () => {
      expect(user(undefined, {})).toMatchSnapshot();
    });

    it('should handle LOGIN_STATUS_UPDATE', () => {
      expect(
        user(undefined, {
          type: UPDATE_USER,
          payload: { status: UserStatus.LOGGING }
        })
      ).toMatchSnapshot();
    });
  });
});
