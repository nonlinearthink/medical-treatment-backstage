import { request } from 'umi';

interface GetDeptListProps {
  orgId: number;
  pageSize: number;
  current: number;
}

export function getDeptList(props: GetDeptListProps) {
  return request(`/api/dept/v2`, {
    method: 'GET',
    params: {
      number: props.current,
      size: props.pageSize,
      orgId: props.orgId,
    },
  });
}

interface UpdateDeptProps {
  deptId: number;
  params: {
    deptName: string;
  };
}

export function updateDept({ deptId, params }: UpdateDeptProps) {
  return request(`/api/dept/${deptId}`, {
    method: 'PUT',
    params,
  });
}

interface DeleteDeptProps {
  deptId: number;
}

export function deleteDept({ deptId }: DeleteDeptProps) {
  return request(`/api/dept/${deptId}`, { method: 'DELETE' });
}

interface CreateDeptProps {
  orgId: number;
  deptName: string;
}

export function createDept(props: CreateDeptProps) {
  return request(`/api/dept`, { method: 'POST', params: props });
}
