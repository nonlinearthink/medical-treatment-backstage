import { request } from 'umi';

export function getServerRequest() {
  return request(`/actuator/metrics/http.server.requests`, { method: 'GET' });
}

export function getLiveThread() {
  return request(`/actuator/metrics/jvm.threads.live`, { method: 'GET' });
}

export function getConnection() {
  return request(`/actuator/metrics/hikaricp.connections`, { method: 'GET' });
}

export function getCpuCount() {
  return request(`/actuator/metrics/system.cpu.count`, { method: 'GET' });
}

export function getCpuUsage() {
  return request(`/actuator/metrics/system.cpu.usage`, { method: 'GET' });
}
