import { connect, AdminModelState, ConnectRC, history } from 'umi';

interface WrapperProps {
  admin: AdminModelState;
}

const SuperAdminWrapper: ConnectRC<WrapperProps> = ({ admin, children }) => {
  if (admin.adminType == '1') {
    return <div>{children}</div>;
  } else {
    history.goBack();
    return <div></div>;
  }
};

export default connect(({ admin }: { admin: AdminModelState }) => ({
  admin,
}))(SuperAdminWrapper);
