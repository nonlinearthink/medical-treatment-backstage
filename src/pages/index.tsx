import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import IconFont from '@/components/iconfont';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';

const IndexPage: React.FC = (props) => {
  return (
    <ProLayout
      title="复诊配药管理系统"
      logo={<IconFont name="yiliaoxiaofeixinxichaxun" size={30} />}
      menuDataRender={() => [
        { path: '/admin', name: '管理员管理', icon: <UserOutlined /> },
      ]}
      siderWidth={220}
      style={{ height: '100vh' }}
    >
      <PageContainer
        header={{
          ghost: true,
        }}
      >
        {props.children}
      </PageContainer>
    </ProLayout>
  );
};

export default IndexPage;
