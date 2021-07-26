import { request } from 'umi';

interface GetDiagnosisListProps {
  pageSize: number;
  current: number;
}

export function getDiagnosisList(props: GetDiagnosisListProps) {
  return request(`/api/diagnosis/v2`, {
    method: 'GET',
    params: { number: props.current, size: props.pageSize },
  });
}

interface UpdateDiagnosisProps {
  diagnosisId: number;
  data: {
    diagnosisType: string;
    diseasesCode: string;
    diseasesName: string;
    pinyinCode: string;
  };
}

export function updateDiagnosis({ diagnosisId, data }: UpdateDiagnosisProps) {
  return request(`/api/diagnosis/${diagnosisId}`, {
    method: 'PUT',
    data,
  });
}

interface DeleteDiagnosisProps {
  diagnosisId: number;
}

export function deleteDiagnosis({ diagnosisId }: DeleteDiagnosisProps) {
  return request(`/api/diagnosis/${diagnosisId}`, { method: 'DELETE' });
}

interface CreateDiagnosisProps {
  diagnosisType: string;
  diseasesCode: string;
  diseasesName: string;
  pinyinCode: string;
}

export function createDiagnosis(props: CreateDiagnosisProps) {
  return request(`/api/diagnosis`, { method: 'POST', data: props });
}
