type Cookie = {
  domain: string;
  expirationDate: number;
  hostOnly: boolean;
  httpOnly: boolean;
  name: string;
  path: string;
  secure: boolean;
  session: boolean;
  value: string;
};

export { Cookie };
