import React from 'react';

type RouterItem = {
  key: string;
  path: string;
  exact?: boolean;
  component: React.ComponentClass<any, any> | React.FunctionComponent<any>;
};

type MenuItem = {
  key: string;
  label: string;
  path?: string; // 以该path开头的链接都属于该菜单项，当有子菜单时才用到。默认跟href相同
  href: string; // 点击后跳转的链接
  hidden?: boolean;
  subMenu?: MenuItem[];
};

export { RouterItem, MenuItem };
