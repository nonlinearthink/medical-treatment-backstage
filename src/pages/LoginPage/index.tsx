import IconFont from '@/components/iconfont';
import React from 'react';
import styles from './index.less';
import { history, UserModelState, ConnectRC, connect } from 'umi';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message } from 'antd';

interface PageProps {
  user: UserModelState;
}

const LoginPage: ConnectRC<PageProps> = ({ user, dispatch }) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <IconFont name="yiliaoxiaofeixinxichaxun" size={44} />
          <span className={styles.title}>复诊配药管理系统</span>
        </div>
        <ProForm
          onFinish={async (values) => {
            setLoading(true);
            dispatch({
              type: 'user/login',
              payload: { params: values },
              onSuccess: () => {
                history.push('/welcome');
                message.success('登录成功');
                setLoading(false);
              },
              onError: () => {
                message.error('账号或密码错误');
                setLoading(false);
              },
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
              loading: loading,
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

export default connect(({ user }: { user: UserModelState }) => ({
  user,
}))(LoginPage);
