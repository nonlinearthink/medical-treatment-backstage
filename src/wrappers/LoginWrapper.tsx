import { Redirect, connect, AdminModelState, ConnectRC } from 'umi';

interface WrapperProps {
  admin: AdminModelState;
}

const LoginWrapper: ConnectRC<WrapperProps> = ({ admin, children }) => {
  if (admin.isLogin) {
    return <div>{children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default connect(({ admin }: { admin: AdminModelState }) => ({
  admin,
}))(LoginWrapper);
