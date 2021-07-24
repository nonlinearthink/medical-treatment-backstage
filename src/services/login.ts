import { request } from 'umi';

interface Props {
  params: {
    adminId: string;
    password: string;
  };
}

export function login(props: Props) {
  return request(`/api/login/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: props.params,
  });
}
