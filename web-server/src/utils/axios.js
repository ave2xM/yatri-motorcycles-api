import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
});

function get(url) {
  return instance.get(url);
}

function post(url, body) {
  return instance.post(url, body);
}

export default { get, post };
