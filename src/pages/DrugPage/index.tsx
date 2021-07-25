import React from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormText, DrawerForm } from '@ant-design/pro-form';
import {
  createDrug,
  deleteDrug,
  getDrugList,
  updateDrug,
} from '@/services/drug';

interface DrugItem {
  drugId: number;
  drugName: string;
  tradeName: string;
  pinyinCode: string;
  specification: string;
  packUnit: string;
  price: number;
  dose: number;
  doseUnit: string;
  factoryName: string;
  approvalNumber: string;
}

const DrugPage = () => {
  const [formVisable, setFormVisable] = React.useState(false);

  const ref = React.useRef<ActionType>();

  const columns: ProColumns<DrugItem>[] = [
    { title: '药品ID', dataIndex: 'drugId', editable: false },
    { title: '药品名称', dataIndex: 'drugName' },
    { title: '商品名', dataIndex: 'tradeName' },
    { title: '拼音码', dataIndex: 'pinyinCode' },
    { title: '药品规格', dataIndex: 'specification' },
    { title: '包装单位', dataIndex: 'packUnit' },
    { title: '药品价格', dataIndex: 'price' },
    { title: '剂量', dataIndex: 'dose' },
    { title: '剂量单位', dataIndex: 'doseUnit' },
    { title: '产地', dataIndex: 'factoryName' },
    { title: '拼批准文号', dataIndex: 'approvalNumber' },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => {
        return [
          <a
            key="edit"
            onClick={() => {
              action?.startEditable?.(record.drugId);
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
        request={getDrugList}
        rowKey="drugId"
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
            return deleteDrug({ drugId: Number(key) });
          },
          onSave: (key, record) => {
            return updateDrug({
              drugId: Number(key),
              data: record,
            }).then((_) => message.success('更新药品信息成功'));
          },
        }}
      />
      <DrawerForm<{
        drugName: string;
        tradeName: string;
        pinyinCode: string;
        specification: string;
        packUnit: string;
        price: number;
        dose: number;
        doseUnit: string;
        factoryName: string;
        approvalNumber: string;
      }>
        title="新建药品"
        visible={formVisable}
        onVisibleChange={setFormVisable}
        onFinish={async (values) => {
          createDrug(values).then((res) => {
            message.success('创建成功');
            setFormVisable(false);
            ref.current?.reload();
          });
        }}
      >
        <ProFormText
          label="药品名称"
          placeholder="请输入药品名称"
          name="drugName"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入药品名称!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormText
          label="商品名"
          placeholder="请输入商品名"
          name="tradeName"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入商品名!',
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
        <ProFormText
          label="药品规格"
          placeholder="请输入药品规格"
          name="specification"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请选择药品规格!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormText
          label="包装单位"
          placeholder="请输入包装单位"
          name="packUnit"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请选择包装单位!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormText
          label="药品价格"
          placeholder="请输入药品价格"
          name="price"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请选择药品价格!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormText
          label="剂量"
          placeholder="请输入剂量"
          name="dose"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请选择剂量!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormText
          label="剂量单位"
          placeholder="请输入剂量单位"
          name="doseUnit"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请选择剂量单位!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormText
          label="产地"
          placeholder="请输入产地"
          name="factoryName"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请选择产地!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
        <ProFormText
          label="批准文号"
          placeholder="请输入批准文号"
          name="approvalNumber"
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请选择批准文号!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
      </DrawerForm>
    </div>
  );
};

export default DrugPage;
