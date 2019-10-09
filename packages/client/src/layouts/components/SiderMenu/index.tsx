import React from 'react';
import { Location } from 'history';
import { SiderbarItemProps } from '@/models/global';
import { getFlatMenuKeys } from './utils';
import SiderMenu from './SiderMenu';

export interface SiderMenuWrapperProps {
  location: Location;
  collapsed: boolean;
  siderbar: SiderbarItemProps[];
};

const SiderMenuWrapper = (props: SiderMenuWrapperProps) => {
  const { location, collapsed, siderbar } = props;
  const flatMenuKeys = getFlatMenuKeys(siderbar);

  return (
    <SiderMenu
      collapsed={collapsed}
      flatMenuKeys={flatMenuKeys}
      location={location}
      siderbar={siderbar}
    />
  );
};

export default SiderMenuWrapper;
