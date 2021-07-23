import IconFont from '@/components/iconfont';
import React from 'react';
import styles from './index.less';
import { history, AdminModelState, ConnectRC, Loading, connect } from 'umi';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface PageProps {
  admin: AdminModelState;
  loading: boolean;
}

const LoginPage: ConnectRC<PageProps> = ({ admin, dispatch }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <IconFont name="yiliaoxiaofeixinxichaxun" size={44} />
          <span className={styles.title}>复诊配药管理系统</span>
        </div>
        <ProForm
          onFinish={async (values) => {
            dispatch({
              type: 'admin/login',
              payload: values,
            }).then(() => {
              history.push('/welcome');
            });
          }}
          submitter={{
            searchConfig: { submitText: '登录' },
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
          style={{ width: 300 }}
        >
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
              autoComplete: 'username',
            }}
            name="adminId"
            placeholder="请输入管理员账号"
            rules={[
              {
                required: true,
                message: '请输入账号!',
                validateTrigger: 'onSubmit',
              },
            ]}
          />
          <ProFormText.Password
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
              autoComplete: 'current-password',
            }}
            name="password"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码!',
                validateTrigger: 'onSubmit',
              },
            ]}
          />
        </ProForm>
      </div>
    </div>
  );
};

export default connect(
  ({ admin, loading }: { admin: AdminModelState; loading: Loading }) => ({
    admin,
    loading: loading.models.admin,
  }),
)(LoginPage);
