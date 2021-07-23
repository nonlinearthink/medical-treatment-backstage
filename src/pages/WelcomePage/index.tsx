import { useSelector } from '@/.umi/plugin-dva/exports';
import React from 'react';
import { AdminModelState, Loading, connect, ConnectRC, history } from 'umi';

interface PageProps {
  admin: AdminModelState;
  loading: boolean;
}

const WelcomePage: ConnectRC<PageProps> = ({ admin }) => {
  return <div>ok</div>;
};

export default connect(
  ({ admin, loading }: { admin: AdminModelState; loading: Loading }) => ({
    admin,
    loading: loading.models.admin,
  }),
)(WelcomePage);
