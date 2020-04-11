import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUserInfo } from '@/rendererProcess/auth';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    refreshUserInfo(dispatch);
  }, []);
  return <>{children}</>;
}
