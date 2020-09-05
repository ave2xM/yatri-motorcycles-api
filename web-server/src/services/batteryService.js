import axios from '../utils/axios';

export function getAllBatteries() {
  return axios.get('/api/v1/batteries');
}

export function reserveBattery(id) {
  return axios.post(`/api/v1/batteries/reserve/${id}`);
}

export function resetBatteryAvaibility() {
  return axios.post('/api/v1/batteries/reset');
}
