import React from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormText, DrawerForm, ProFormSelect } from '@ant-design/pro-form';
import {
  createDoctor,
  deleteDoctor,
  getDoctor,
  getDoctorList,
} from '@/services/doctor';
import { history } from 'umi';

interface DoctorItem {
  doctorId: number;
  doctorName: string;
  avatarUrl: string;
  levelCode: string;
  levelName: string;
  orgId: number;
  orgName: string;
  deptId: number;
  deptName: string;
  phoneNo: string;
}

const DoctorPage = () => {
  const [formVisable, setFormVisable] = React.useState(false);

  const ref = React.useRef<ActionType>();

  const columns: ProColumns<DoctorItem>[] = [
    { title: '医生ID', dataIndex: 'doctorId', editable: false },
    { title: '医生姓名', dataIndex: 'doctorName' },
    { title: '头像', dataIndex: 'avatarUrl', valueType: 'avatar' },
    {
      title: '职称',
      dataIndex: 'levelCode',
      valueType: 'select',
      valueEnum: {
        1: { text: '主任医师' },
        2: { text: '副主任医师' },
        3: { text: '主治医师' },
        4: { text: '医师' },
        5: { text: '医士' },
      },
    },
    { title: '所属机构', dataIndex: 'orgName' },
    { title: '所属科室', dataIndex: 'deptName' },
    { title: '手机号', dataIndex: 'phoneNo' },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => {
        return [
          <a
            key="edit"
            onClick={() => {
              history.push({
                pathname: '/doctor/edit',
                query: { doctorId: record.doctorId.toString() },
              });
            }}
          >
            编辑
          </a>,
          <a
            key="delete"
            onClick={() => {
              deleteDoctor({ doctorId: record.doctorId });
              ref.current?.reload();
            }}
          >
            删除
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
        request={getDoctorList}
        rowKey="doctorId"
        options={{ density: false, fullScreen: true }}
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push({ pathname: '/doctor/new' })}
          >
            新增
          </Button>,
        ]}
      />
      <DrawerForm<{
        doctorName: string;
        deptId: number;
        avatarUrl: string;
        levelCode: string;
        phoneNo: string;
      }>
        title="新建医生"
        visible={formVisable}
        onVisibleChange={setFormVisable}
        onFinish={async (values) => {
          createDoctor(values).then((res) => {
            message.success('创建成功');
            setFormVisable(false);
            ref.current?.reload();
          });
        }}
      >
        <ProFormText
          label="医生姓名"
          placeholder="请输入医生姓名"
          name="doctorName"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入医生姓名!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormSelect
          label="职称"
          name="levelCode"
          options={[
            { value: '1', label: '主任医师' },
            { value: '2', label: '副主任医师' },
            { value: '3', label: '主治医师' },
            { value: '4', label: '医师' },
            { value: '5', label: '医士' },
          ]}
          rules={[
            {
              required: true,
              message: '请选择职称!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormText
          label="手机号码"
          placeholder="请输入手机号码"
          name="phoneNo"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入手机号码!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
      </DrawerForm>
    </div>
  );
};

export default DoctorPage;
