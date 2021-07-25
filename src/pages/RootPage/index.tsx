import React from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import {
  createAdmin,
  deleteAdmin,
  getAdminList,
  resetPassword,
  updateAdmin,
} from '@/services/admin';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  ProFormText,
  ProFormSelect,
  ModalForm,
  DrawerForm,
} from '@ant-design/pro-form';

interface AdminItem {
  adminId: string;
  adminType: string;
  createTime: Date;
}

const AdminPage = () => {
  const [resetPasswordVisable, setResetPasswordVisable] = React.useState(false);
  const [editingKey, setEditingKey] = React.useState('');

  const [adminFormVisable, setAdminFormVisable] = React.useState(false);

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
      <ModalForm<{ password: string }>
        title="密码重置"
        visible={resetPasswordVisable}
        onVisibleChange={setResetPasswordVisable}
        onFinish={async (values) => {
          resetPassword({
            adminId: editingKey,
            params: { password: values.password },
          }).then((_) => {
            message.success('更新密码成功');
            setResetPasswordVisable(false);
          });
        }}
      >
        <ProFormText.Password
          label="密码"
          placeholder="请输入密码"
          name="password"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入机构名称!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
      </ModalForm>
      <DrawerForm<{ adminId: string; password: string; adminType: string }>
        title="管理员信息"
        visible={adminFormVisable}
        onVisibleChange={setAdminFormVisable}
        onFinish={async (values) => {
          createAdmin(values).then((res) => {
            message.success('创建成功');
            setAdminFormVisable(false);
            ref.current?.reload();
          });
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
      </DrawerForm>
    </div>
  );
};

export default AdminPage;
