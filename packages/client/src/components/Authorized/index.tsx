import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';

interface AuthorizedProps {
  has: string | string[];
  permissions: string[];
  children?: React.ReactNode;
};

const Authorized = ({ has, permissions, children }: AuthorizedProps) => {
  const hasAuth = Array.isArray(has)
    ? has.find(item => permissions.includes(item))
    : permissions.includes(has);

  return hasAuth ? <>{children}</> : null;
}

export default connect(
  ({ user }: ConnectState) => ({
    permissions: user.permissions,
  }),
)(Authorized);
