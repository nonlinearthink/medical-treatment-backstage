import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import IconFont from '@/components/iconfont';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const IndexPage: React.FC = (props) => {
  return (
    <ProLayout
      title="复诊配药管理系统"
      logo={<IconFont name="yiliaoxiaofeixinxichaxun" size={30} />}
      menuDataRender={() => [
        { path: '/admin/welcome', name: '欢迎', icon: <DashboardOutlined /> },
        { path: '/admin/root', name: '管理员管理', icon: <UserOutlined /> },
      ]}
      rightContentRender={() => (
        <div style={{}}>
          <IconFont name="AdminRoles" size={30} />
        </div>
      )}
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
