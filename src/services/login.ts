import { request } from 'umi';

interface Params {
  adminId: string;
  password: string;
}

export function login(params: Params) {
  return request(`https://www.piduoduo.xyz/api/login/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}
