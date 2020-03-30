import React from 'react';
import ProLayout from '@ant-design/pro-layout';

export default ({ children }: any) => {
  return <ProLayout style={{ minHeight: '100vh' }}>{children}</ProLayout>;
}
