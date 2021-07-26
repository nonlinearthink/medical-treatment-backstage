import React from 'react';
import { UserModelState, Loading, connect, ConnectRC, history } from 'umi';
import ProCard from '@ant-design/pro-card';

interface PageProps {
  user: UserModelState;
}

const WelcomePage: ConnectRC<PageProps> = ({ user }) => {
  return (
    <div>
      <ProCard
        title="复诊配药管理系统"
        subTitle="V0.4.0"
        bordered
        headerBordered
      ></ProCard>
    </div>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => ({
    user,
    loading: loading.models.admin,
  }),
)(WelcomePage);
