import React from 'react';
import ProList from '@ant-design/pro-list';
import IconFont from '@/components/iconfont';
import { Button, message, PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormText, ModalForm } from '@ant-design/pro-form';
import { ActionType } from '@ant-design/pro-table';
import {
  createDept,
  deleteDept,
  getDeptList,
  updateDept,
} from '@/services/dept';
import { getOrg } from '@/services/org';

const DeptPage: React.FC = (props: any) => {
  const [createVisiable, setCreateVisiable] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const ref = React.useRef<ActionType>();

  React.useEffect(() => {
    if (title == '') {
      getOrg({ orgId: props.location.query.orgId }).then((res) => {
        setTitle(res.orgName);
      });
    }
  }, []);
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.back()}
        title={title}
      />
      <ProList
        actionRef={ref}
        rowKey="deptId"
        headerTitle="科室列表"
        grid={{ gutter: 16, column: 2 }}
        pagination={{
          pageSize: 12,
        }}
        request={({ pageSize, current }) => {
          let res = getDeptList({
            pageSize: pageSize ? pageSize : 12,
            current: current ? current : 1,
            orgId: props.location.query.orgId,
          });
          return res;
        }}
        options={{ density: false, fullScreen: true, setting: false }}
        metas={{
          title: { dataIndex: 'deptName', title: '机构名' },
          avatar: {
            render: (text, row) => <IconFont name="yiyuan" size={30} />,
          },
          content: {
            dataIndex: 'creatorId',
            title: '创建者',
            render: (dom) => (
              <div style={{ marginLeft: '0.5rem', color: '#888' }}>
                创建管理员: {dom}
              </div>
            ),
            editable: false,
          },
          actions: {
            render: (text, row, _, action) => [
              <a key="edit" onClick={() => action?.startEditable?.(row.deptId)}>
                编辑
              </a>,
            ],
          },
        }}
        editable={{
          onSave: (key, record) => {
            return updateDept({
              deptId: Number(key),
              params: { deptName: record.deptName },
            });
          },
          onDelete: (key) => {
            return deleteDept({ deptId: Number(key) });
          },
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateVisiable(true)}
          >
            新增
          </Button>,
        ]}
      />
      <ModalForm<{ deptName: string }>
        visible={createVisiable}
        onVisibleChange={setCreateVisiable}
        title="新建科室"
        onFinish={async (values) => {
          createDept({
            deptName: values.deptName,
            orgId: Number(props.location.query.orgId),
          }).then((res) => {
            message.success('新建成功');
            ref.current?.reload();
            setCreateVisiable(false);
          });
        }}
      >
        <ProFormText
          label="科室名称"
          placeholder="请输入科室名称"
          name="deptName"
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
    </div>
  );
};

export default DeptPage;
