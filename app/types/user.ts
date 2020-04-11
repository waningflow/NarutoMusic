enum UserStatus {
  UNLOG = 'not-logged',
  LOGGING = 'logging',
  LOGGED = 'logged-in'
}

type UserInfo = {
  code?: number;
  loginType?: number;
  account?: { [key: string]: any };
  token?: string;
  profile?: { [key: string]: any };
  bindings?: { [key: string]: any }[];
};

type User = {
  status: UserStatus;
  userInfo: UserInfo;
};

export { UserStatus, UserInfo, User };
