import React from 'react';
import { Location } from 'history';
import { SiderbarItemProps } from '@/models/user';
import SiderMenu from './SiderMenu';
import { getFlatPaths } from './utils';

export interface SiderMenuWrapperProps {
  location: Location;
  collapsed: boolean;
  siderbar: SiderbarItemProps[];
};

const SiderMenuWrapper = (props: SiderMenuWrapperProps) => {
  const { location, collapsed, siderbar } = props;
  const flatMenuKeys = getFlatPaths(siderbar);

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
