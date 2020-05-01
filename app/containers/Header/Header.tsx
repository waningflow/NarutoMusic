import React from 'react';
import HeaderMenu from '@/components/HeaderMenu';
import './Header.less';

export default function Header() {
  return (
    <div className="header_container">
      <div className="header-history-action-wrapper" />
      <div className="header-menu-wrapper">
        <HeaderMenu />
      </div>
    </div>
  );
}
