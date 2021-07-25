import { Redirect, connect, UserModelState, ConnectRC } from 'umi';

interface WrapperProps {
  user: UserModelState;
}

const LoginWrapper: ConnectRC<WrapperProps> = ({ user, children }) => {
  if (user.isLogin) {
    return <div>{children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default connect(({ user }: { user: UserModelState }) => ({
  user,
}))(LoginWrapper);
