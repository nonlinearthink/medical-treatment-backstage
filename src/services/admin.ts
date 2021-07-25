import { request } from 'umi';

interface GetAdminListProps {
  pageSize: number;
  current: number;
}

export function getAdminList(props: GetAdminListProps) {
  return request(`/api/admin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { number: props.current, size: props.pageSize },
  });
}

interface UpdateAdminProps {
  adminId: string;
  params: {
    adminType: string;
  };
}

export function updateAdmin({ adminId, params }: UpdateAdminProps) {
  return request(`/api/admin/${adminId}`, {
    method: 'PUT',
    params,
  });
}

interface DeleteAdminProps {
  adminId: string;
}

export function deleteAdmin({ adminId }: DeleteAdminProps) {
  return request(`/api/admin/${adminId}`, { method: 'DELETE' });
}

interface ResetPasswordProps {
  adminId: string;
  params: {
    password: string;
  };
}

export function resetPassword({ adminId, params }: ResetPasswordProps) {
  return request(`/api/admin/${adminId}/password`, { method: 'PUT', params });
}

interface UpdatePasswordProps {
  oldPassword: string;
  newPassword: string;
}

export function updatePassword(props: UpdatePasswordProps) {
  return request(`/api/admin/password`, { method: 'PUT', params: props });
}

interface CreateAdminProps {
  adminId: string;
  password: string;
  adminType: string;
}

export function createAdmin(props: CreateAdminProps) {
  return request(`/api/admin`, { method: 'POST', params: props });
}
