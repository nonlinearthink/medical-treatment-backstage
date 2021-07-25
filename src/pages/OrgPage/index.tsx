import React from 'react';
import ProList from '@ant-design/pro-list';
import { createOrg, deleteOrg, getOrgList, updateOrg } from '@/services/org';
import IconFont from '@/components/iconfont';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormText, ModalForm } from '@ant-design/pro-form';
import { ActionType } from '@ant-design/pro-table';
import { history } from 'umi';

const OrgPage = () => {
  const [createVisiable, setCreateVisiable] = React.useState(false);

  const ref = React.useRef<ActionType>();

  return (
    <div>
      <ProList
        actionRef={ref}
        rowKey="orgId"
        headerTitle="机构列表"
        grid={{ gutter: 16, column: 2 }}
        pagination={{
          pageSize: 12,
        }}
        request={getOrgList}
        options={{ density: false, fullScreen: true, setting: false }}
        metas={{
          title: { dataIndex: 'orgName', title: '机构名' },
          avatar: {
            render: (text, row) => (
              <IconFont name="S_anyiyuanguahao" size={30} />
            ),
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
              <a key="edit" onClick={() => action?.startEditable?.(row.orgId)}>
                编辑
              </a>,
              <a
                key="dept"
                onClick={() =>
                  history.push({
                    pathname: '/org/dept',
                    query: { orgId: row.orgId },
                  })
                }
              >
                科室管理
              </a>,
            ],
          },
        }}
        editable={{
          onSave: (key, record) => {
            return updateOrg({
              orgId: Number(key),
              params: { orgName: record.orgName },
            });
          },
          onDelete: (key) => {
            return deleteOrg({ orgId: Number(key) });
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
      <ModalForm<{ orgName: string }>
        visible={createVisiable}
        onVisibleChange={setCreateVisiable}
        title="新建机构"
        onFinish={async (values) => {
          createOrg(values).then((res) => {
            message.success('新建成功');
            ref.current?.reload();
            setCreateVisiable(false);
          });
        }}
      >
        <ProFormText
          label="机构名称"
          placeholder="请输入机构名称"
          name="orgName"
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

export default OrgPage;
