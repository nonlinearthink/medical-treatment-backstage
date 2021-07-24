import React from 'react';
import ProTable, { TableDropdown, ProColumns } from '@ant-design/pro-table';
import { getAdminList } from '@/services/getAdminList';
import { Popconfirm, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface AdminItem {
  adminId: string;
  adminType: string;
  createTime: number;
  deleteMark: boolean;
}

const renderRemove = (text: string) => (
  <Popconfirm
    key="popconfirm"
    title={`确认${text}吗?`}
    okText="是"
    cancelText="否"
  >
    <a>{text}</a>
  </Popconfirm>
);

const columns: ProColumns<AdminItem>[] = [
  { title: '管理员', dataIndex: 'adminId' },
  {
    title: '管理员类型',
    dataIndex: 'adminType',
    valueType: 'select',
    valueEnum: {
      1: { text: '超级管理员' },
      2: { text: '管理员' },
    },
  },
  { title: '创建时间', dataIndex: 'createTime' },
  {
    title: '是否被删除',
    dataIndex: 'deleteMark',
    valueType: 'switch',
    editable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (_, record) => {
      return [
        <a key="view">查看</a>,
        <a key="edit">编辑</a>,
        renderRemove('移除'),
      ];
    },
  },
];

const AdminPage = () => {
  return (
    <ProTable
      columns={columns}
      request={getAdminList}
      rowKey="adminId"
      options={{ density: false, fullScreen: true }}
      toolBarRender={() => [
        <Button type="primary" icon={<PlusOutlined />}>
          新增
        </Button>,
      ]}
    />
  );
};

export default AdminPage;
