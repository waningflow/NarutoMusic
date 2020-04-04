enum UserStatus {
  UNLOG = 'not-logged',
  LOGGING = 'logging',
  LOGGED = 'logged-in'
}

type User = {
  status: UserStatus;
  loginType?: number;
  account?: { [key: string]: any };
  token?: string;
  profile?: { [key: string]: any };
  bindings?: { [key: string]: any }[];
};

export { UserStatus, User };
