import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import IconFont from '@/components/iconfont';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { Link, AdminModelState, ConnectRC, connect, history } from 'umi';
import { Drawer, Button, message } from 'antd';
import React from 'react';
import styles from './index.less';
import Profile from '@/components/Profile';

interface PageProps {
  admin: AdminModelState;
}

const IndexPage: ConnectRC<PageProps> = (props) => {
  const [adminInfoVisible, setAdminInfoVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  return (
    <ProLayout
      title="复诊配药管理系统"
      logo={<IconFont name="yiliaoxiaofeixinxichaxun" size={30} />}
      menuDataRender={() => [
        { path: '/admin/welcome', name: '欢迎', icon: <DashboardOutlined /> },
        { path: '/admin/root', name: '管理员管理', icon: <UserOutlined /> },
      ]}
      menuItemRender={(item, dom) => {
        let path = item.path?.replace('/admin', '');
        return <Link to={path || '/welcome'}>{dom}</Link>;
      }}
      rightContentRender={() => (
        <div className={styles.avatar}>
          <IconFont
            name="yonghu"
            size={35}
            color="#1496da"
            onClick={() => setAdminInfoVisible(true)}
          />
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
      <Drawer
        title="管理员信息"
        placement="right"
        closable={false}
        onClose={() => setAdminInfoVisible(false)}
        visible={adminInfoVisible}
      >
        <Profile label="管理员:" content={props.admin.adminId} />
        <Profile
          label="权限:"
          content={props.admin.adminType == '1' ? '超级管理员' : '管理员'}
        />
        <Profile
          label="网络状态:"
          content={
            navigator.onLine ? (
              <div style={{ color: '#15da15' }}>在线</div>
            ) : (
              <div style={{ color: '#da1515' }}>离线</div>
            )
          }
        />
        <Button
          type="primary"
          loading={loading}
          block
          style={{ marginTop: '2rem' }}
          onClick={() => {
            setLoading(true);
            props.dispatch({
              type: 'admin/logout',
              onSuccess: () => {
                history.push('/login');
                message.success('登出成功');
                setLoading(false);
              },
            });
          }}
        >
          登出
        </Button>
      </Drawer>
    </ProLayout>
  );
};

export default connect(({ admin }: { admin: AdminModelState }) => ({
  admin,
}))(IndexPage);
