import { request } from 'umi';

interface Props {
  pageSize: number;
  current: number;
}

export function getAdminList(props: Props) {
  return request(`/api/admin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { number: props.current, size: props.pageSize },
  });
}
