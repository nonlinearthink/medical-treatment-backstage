import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import IconFont from '@/components/iconfont';
import {
  DashboardOutlined,
  UserOutlined,
  DeploymentUnitOutlined,
  HighlightOutlined,
} from '@ant-design/icons';
import { Link, UserModelState, ConnectRC, connect, history } from 'umi';
import { Drawer, Button, message, Badge, Modal, Form, Input } from 'antd';
import React from 'react';
import styles from './index.less';
import Profile from '@/components/Profile';
import { updatePassword } from '@/services/admin';

interface PageProps {
  user: UserModelState;
}

const IndexPage: ConnectRC<PageProps> = (props) => {
  const [adminInfoVisible, setAdminInfoVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [changePasswordVisable, setChangePasswordVisable] =
    React.useState(false);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  return (
    <ProLayout
      title="复诊配药管理系统"
      logo={<IconFont name="yiliaoxiaofeixinxichaxun" size={30} />}
      menuDataRender={() => [
        { path: '/admin/welcome', name: '欢迎', icon: <DashboardOutlined /> },
        { path: '/admin/root', name: '管理员管理', icon: <UserOutlined /> },
        {
          path: '/admin/org',
          name: '机构与科室管理',
          icon: <DeploymentUnitOutlined />,
        },
        {
          path: '/admin/diagnosis',
          name: '诊断管理',
          icon: <HighlightOutlined />,
        },
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
      style={{ height: '100%', minHeight: '100vh' }}
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
        <Profile label="管理员:" content={props.user.adminId} />
        <Profile
          label="权限:"
          content={props.user.adminType == '1' ? '超级管理员' : '管理员'}
        />
        <Profile
          label="网络状态:"
          content={
            navigator.onLine ? (
              <Badge status="processing" text="在线" color="green" />
            ) : (
              <Badge status="processing" text="离线" color="red" />
            )
          }
        />
        <Button
          block
          style={{ marginTop: '2rem' }}
          onClick={() => setChangePasswordVisable(true)}
        >
          修改密码
        </Button>
        <Button
          type="primary"
          loading={loading}
          block
          style={{ marginTop: '2rem' }}
          onClick={() => {
            setLoading(true);
            props.dispatch({
              type: 'user/logout',
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
      <Modal
        title="密码重置"
        visible={changePasswordVisable}
        onOk={() => {
          updatePassword({ newPassword, oldPassword }).then((res) => {
            console.log(res);
            message.success('更新密码成功');
            setOldPassword('');
            setNewPassword('');
            setChangePasswordVisable(false);
          });
        }}
        onCancel={() => {
          setChangePasswordVisable(false);
          setOldPassword('');
          setNewPassword('');
        }}
        okButtonProps={{
          disabled: newPassword == '' || oldPassword == '',
        }}
      >
        <Form.Item label="旧密码">
          <Input.Password
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="新密码">
          <Input.Password
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </Form.Item>
      </Modal>
    </ProLayout>
  );
};

export default connect(({ user }: { user: UserModelState }) => ({
  user,
}))(IndexPage);
