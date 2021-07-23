import { useSelector } from '@/.umi/plugin-dva/exports';
import React from 'react';
import { AdminModelState, Loading, connect, ConnectRC } from 'umi';

interface PageProps {
  admin: AdminModelState;
  loading: boolean;
}

const WelcomePage: ConnectRC<PageProps> = () => {
  return <div></div>;
};

export default connect(
  ({ admin, loading }: { admin: AdminModelState; loading: Loading }) => ({
    admin,
    loading: loading.models.admin,
  }),
)(WelcomePage);
