import { getDeptList } from '@/services/dept';
import { getOrgList } from '@/services/org';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';
import { Upload, Form, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createDoctor, getDoctor, updateDoctor } from '@/services/doctor';
import { history, request } from 'umi';

const EditDoctorPage: React.FC = (props: any) => {
  const [selectedOrgId, setSelectedOrgId] = React.useState(-1);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [doctor, setDoctor] = React.useState<{
    doctorName: string;
    levelCode: string;
    avatarUrl: string;
    phoneNo: string;
    orgId: number;
    deptId: number;
  } | null>(null);
  React.useEffect(() => {
    if (props.location.query.doctorId && doctor == null) {
      getDoctor({ doctorId: props.location.query.doctorId }).then((res) => {
        console.log(res);
        if (res.orgId) {
          setSelectedOrgId(res.orgId);
        }
        setDoctor(res);
        if (res.avatarUrl) {
          setImageUrl(res.avatarUrl);
        }
      });
    }
  }, []);
  return doctor ? (
    <ProForm
      initialValues={{
        doctorName: doctor.doctorName,
        phoneNo: doctor.phoneNo,
        levelCode: doctor.levelCode,
        orgId: doctor.orgId.toString(),
        deptId: doctor.deptId.toString(),
      }}
      onValuesChange={(values) => {
        console.log(values);
        if (values.orgId) {
          setSelectedOrgId(values.orgId);
        }
      }}
      onFinish={(values) => {
        console.log(values);
        return updateDoctor({
          doctorId: props.location.query.doctorId,
          data: {
            ...values,
            avatarUrl: imageUrl,
            deptId: Number(values.deptId),
          },
        }).then((res) => {
          message.success('更新医生成功');
          history.push('/doctor');
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
      <Form.Item name="avatarUrl" label="头像">
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          customRequest={(files) => {
            const { file } = files;
            let formData = new FormData();
            formData.append('file', file);
            request(`/api/image/upload/normal`, {
              method: 'POST',
              headers: { 'Content-Type': 'multipart/form-data' },
              body: formData,
            }).then((res) => {
              setLoading(false);
              setImageUrl(res.photoUrl);
            });
          }}
          style={{ height: 128, width: 128 }}
          onChange={(info) => {
            if (info.file.status == 'uploading') {
              setLoading(true);
              return;
            }
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>
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
      <ProFormSelect
        label="所属机构"
        name="orgId"
        request={async () => {
          let res = await getOrgList({ pageSize: 20, current: 1 });
          return res.data.map((item: { orgId: number; orgName: string }) => {
            return { value: item.orgId.toString(), label: item.orgName };
          });
        }}
        rules={[
          {
            required: true,
            message: '请选择所属机构!',
            validateTrigger: 'onSubmit',
          },
        ]}
      />
      {selectedOrgId == -1 ? undefined : (
        <ProFormSelect
          label="所属科室"
          name="deptId"
          request={async () => {
            let res = await getDeptList({
              pageSize: 20,
              current: 1,
              orgId: selectedOrgId,
            });
            return res.data.map(
              (item: { deptId: number; deptName: string }) => {
                return { value: item.deptId.toString(), label: item.deptName };
              },
            );
          }}
          rules={[
            {
              required: true,
              message: '请选择所属科室!',
              validateTrigger: 'onSubmit',
            },
          ]}
        />
      )}
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
    </ProForm>
  ) : (
    <div></div>
  );
};

export default EditDoctorPage;
