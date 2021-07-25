import { request } from 'umi';

interface GetOrgListProps {
  pageSize: number;
  current: number;
}

export function getOrgList(props: GetOrgListProps) {
  return request(`/api/org/v2`, {
    method: 'GET',
    params: { number: props.current, size: props.pageSize },
  });
}

interface UpdateOrgProps {
  orgId: number;
  params: {
    orgName: string;
  };
}

export function updateOrg({ orgId, params }: UpdateOrgProps) {
  return request(`/api/org/${orgId}`, {
    method: 'PUT',
    params,
  });
}

interface DeleteOrgProps {
  orgId: number;
}

export function deleteOrg({ orgId }: DeleteOrgProps) {
  return request(`/api/org/${orgId}`, { method: 'DELETE' });
}

interface CreateOrgProps {
  orgName: string;
}

export function createOrg(props: CreateOrgProps) {
  return request(`/api/org`, { method: 'POST', params: props });
}

interface GetOrgProps {
  orgId: number;
}

export function getOrg(props: GetOrgProps) {
  return request(`/api/org/${props.orgId}`, { method: 'GET' });
}
