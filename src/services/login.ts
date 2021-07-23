import { request } from 'umi';

interface Params {
  adminId: string;
  password: string;
}

export function login(params: Params) {
  return request(`/api/login/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}
