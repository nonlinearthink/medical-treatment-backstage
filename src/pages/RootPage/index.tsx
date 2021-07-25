import React from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import {
  createAdmin,
  deleteAdmin,
  getAdminList,
  resetPassword,
  updateAdmin,
} from '@/services/admin';
import { Modal, Button, Input, Form, message, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';

interface AdminItem {
  adminId: string;
  adminType: string;
  createTime: Date;
}

const AdminPage = () => {
  const [resetPasswordVisable, setResetPasswordVisable] = React.useState(false);
  const [editingKey, setEditingKey] = React.useState('');
  const [password, setPassword] = React.useState('123456');

  const [adminFormVisable, setAdminFormVisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const ref = React.useRef<ActionType>();

  const columns: ProColumns<AdminItem>[] = [
    { title: '管理员', dataIndex: 'adminId', editable: false },
    {
      title: '管理员类型',
      dataIndex: 'adminType',
      valueType: 'select',
      valueEnum: {
        1: { text: '超级管理员' },
        2: { text: '管理员' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (val) => (val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''),
      editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => {
        return [
          <a
            key="edit"
            onClick={() => {
              action?.startEditable?.(record.adminId);
            }}
          >
            编辑
          </a>,
          <a
            key="resetPassword"
            onClick={() => {
              setResetPasswordVisable(true);
              setEditingKey(record.adminId);
            }}
          >
            重置密码
          </a>,
        ];
      },
    },
  ];

  return (
    <div>
      <ProTable
        actionRef={ref}
        columns={columns}
        request={getAdminList}
        rowKey="adminId"
        options={{ density: false, fullScreen: true }}
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAdminFormVisable(true)}
          >
            新增
          </Button>,
        ]}
        editable={{
          onDelete: (key) => {
            return deleteAdmin({ adminId: key.toString() });
          },
          onSave: (key, record) => {
            return updateAdmin({
              adminId: key.toString(),
              params: { adminType: record.adminType },
            }).then((_) => message.success('更新管理员信息成功'));
          },
        }}
      />
      <Modal
        title="密码重置"
        visible={resetPasswordVisable}
        onOk={() => {
          setResetPasswordVisable(false);
          resetPassword({ adminId: editingKey, params: { password } }).then(
            (_) => {
              message.success('更新密码成功');
              setPassword('123456');
            },
          );
        }}
        onCancel={() => {
          setResetPasswordVisable(false);
          setPassword('123456');
        }}
        okButtonProps={{ disabled: password == '' }}
      >
        <Form.Item label="密码">
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
      </Modal>
      <Drawer
        title="管理员信息"
        placement="right"
        closable={false}
        onClose={() => setAdminFormVisable(false)}
        visible={adminFormVisable}
        width={'30%'}
      >
        <ProForm<{ adminId: string; password: string; adminType: string }>
          onFinish={async (values) => {
            setLoading(true);
            createAdmin(values)
              .then((res) => {
                message.success('创建成功');
                setLoading(false);
                setAdminFormVisable(false);
                ref.current?.reload();
              })
              .catch((_) => setLoading(false));
          }}
          onReset={() => setAdminFormVisable(false)}
          submitter={{
            searchConfig: { submitText: '创建', resetText: '取消' },
            submitButtonProps: { loading: loading },
          }}
        >
          <ProFormText
            label="管理员ID"
            placeholder="请输入管理员ID"
            name="adminId"
            fieldProps={{
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '请输入账号!',
                validateTrigger: 'onSubmit',
              },
            ]}
          />
          <ProFormText.Password
            label="管理员密码"
            placeholder="请输入管理员密码"
            name="password"
            fieldProps={{
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '请输入密码!',
                validateTrigger: 'onSubmit',
              },
            ]}
          />
          <ProFormSelect
            label="管理员类型"
            name="adminType"
            options={[
              { value: '1', label: '超级管理员' },
              { value: '2', label: '管理员' },
            ]}
            rules={[
              {
                required: true,
                message: '请选择用户类型密码!',
                validateTrigger: 'onSubmit',
              },
            ]}
          />
        </ProForm>
      </Drawer>
    </div>
  );
};

export default AdminPage;
