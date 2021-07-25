import React from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormText, ProFormSelect, DrawerForm } from '@ant-design/pro-form';
import {
  createDiagnosis,
  deleteDiagnosis,
  getDiagnosisList,
  updateDiagnosis,
} from '@/services/diagnosis';

interface DiagnosisItem {
  diagnosisId: number;
  diagnosisType: string;
  diseasesCode: string;
  diseasesName: string;
  pinyinCode: string;
}

const DiagnosisPage = () => {
  const [formVisable, setFormVisable] = React.useState(false);

  const ref = React.useRef<ActionType>();

  const columns: ProColumns<DiagnosisItem>[] = [
    { title: '诊断ID', dataIndex: 'diagnosisId', editable: false },
    {
      title: '诊断类型',
      dataIndex: 'diagnosisType',
      valueType: 'select',
      valueEnum: {
        1: { text: '西医' },
        2: { text: '中医' },
      },
    },
    { title: '疾病代码', dataIndex: 'diseasesCode' },
    { title: '疾病名称', dataIndex: 'diseasesName' },
    { title: '拼音码', dataIndex: 'pinyinCode' },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => {
        return [
          <a
            key="edit"
            onClick={() => {
              action?.startEditable?.(record.diagnosisId);
            }}
          >
            编辑
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
        request={getDiagnosisList}
        rowKey="diagnosisId"
        options={{ density: false, fullScreen: true }}
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setFormVisable(true)}
          >
            新增
          </Button>,
        ]}
        editable={{
          onDelete: (key) => {
            return deleteDiagnosis({ diagnosisId: Number(key) });
          },
          onSave: (key, record) => {
            return updateDiagnosis({
              diagnosisId: Number(key),
              data: {
                diagnosisType: record.diagnosisType,
                diseasesCode: record.diseasesCode,
                diseasesName: record.diseasesName,
                pinyinCode: record.pinyinCode,
              },
            }).then((_) => message.success('更新诊断信息成功'));
          },
        }}
      />
      <DrawerForm<{
        diagnosisType: string;
        diseasesCode: string;
        diseasesName: string;
        pinyinCode: string;
      }>
        title="新建诊断"
        visible={formVisable}
        onVisibleChange={setFormVisable}
        onFinish={async (values) => {
          createDiagnosis(values).then((res) => {
            message.success('创建成功');
            setFormVisable(false);
            ref.current?.reload();
          });
        }}
      >
        <ProFormText
          label="疾病代码"
          placeholder="请输入疾病代码"
          name="diseasesCode"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入疾病代码!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormText
          label="疾病名称"
          placeholder="请输入疾病名称"
          name="diseasesName"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入疾病名称!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormText
          label="拼音码"
          placeholder="请输入拼音码"
          name="pinyinCode"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入拼音码!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormSelect
          label="诊断类型"
          name="diagnosisType"
          options={[
            { value: '1', label: '西医' },
            { value: '2', label: '中医' },
          ]}
          rules={[
            {
              required: true,
              message: '请选择诊断类型!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
      </DrawerForm>
    </div>
  );
};

export default DiagnosisPage;
