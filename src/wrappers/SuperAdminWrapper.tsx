import { connect, UserModelState, ConnectRC, history } from 'umi';

interface WrapperProps {
  user: UserModelState;
}

const SuperAdminWrapper: ConnectRC<WrapperProps> = ({ user, children }) => {
  if (user.adminType == '1') {
    return <div>{children}</div>;
  } else {
    history.goBack();
    return <div></div>;
  }
};

export default connect(({ user }: { user: UserModelState }) => ({
  user,
}))(SuperAdminWrapper);
