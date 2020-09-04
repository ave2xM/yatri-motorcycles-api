import axios from '../utils/axios';

export function getAllBatteries(url) {
  return axios.get(url);
}

export function reserveBattery(url) {
  return axios.post(url);
}
