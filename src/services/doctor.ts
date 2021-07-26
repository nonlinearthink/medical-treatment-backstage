import { request } from 'umi';

interface GetDoctorListProps {
  pageSize: number;
  current: number;
}

export function getDoctorList(props: GetDoctorListProps) {
  return request(`/api/doctor/v2`, {
    method: 'GET',
    params: { number: props.current, size: props.pageSize },
  });
}

interface UpdateDoctorProps {
  doctorId: number;
  data: {
    doctorName: string;
    deptId: number;
    avatarUrl: string;
    levelCode: string;
    phoneNo: string;
  };
}

export function updateDoctor({ doctorId, data }: UpdateDoctorProps) {
  return request(`/api/doctor/${doctorId}`, {
    method: 'PUT',
    data,
  });
}

interface DeleteDoctorProps {
  doctorId: number;
}

export function deleteDoctor({ doctorId }: DeleteDoctorProps) {
  return request(`/api/doctor/${doctorId}`, { method: 'DELETE' });
}

interface CreateDoctorProps {
  doctorName: string;
  deptId: number;
  avatarUrl: string;
  levelCode: string;
  phoneNo: string;
}

export function createDoctor(props: CreateDoctorProps) {
  console.log(props);
  return request(`/api/doctor`, { method: 'POST', data: props });
}

interface GetDoctorProps {
  doctorId: number;
}

export function getDoctor(props: GetDoctorProps) {
  return request(`/api/doctor/${props.doctorId}`, { method: 'GET' });
}
