import { request } from 'umi';

interface GetDrugListProps {
  pageSize: number;
  current: number;
}

export function getDrugList(props: GetDrugListProps) {
  return request(`/api/drug/v2`, {
    method: 'GET',
    params: { number: props.current, size: props.pageSize },
  });
}

interface UpdateDrugProps {
  drugId: number;
  data: {
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
  };
}

export function updateDrug({ drugId, data }: UpdateDrugProps) {
  return request(`/api/drug/${drugId}`, {
    method: 'PUT',
    data,
  });
}

interface DeleteDrugProps {
  drugId: number;
}

export function deleteDrug({ drugId }: DeleteDrugProps) {
  return request(`/api/drug/${drugId}`, { method: 'DELETE' });
}

interface CreateDrugProps {
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

export function createDrug(props: CreateDrugProps) {
  console.log(props);
  return request(`/api/drug`, { method: 'POST', data: props });
}
