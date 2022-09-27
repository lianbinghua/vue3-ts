import axios from 'axios';
const http = axios.create({
  baseURL: 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json;charset=utf-8',
  },
});
http.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token') || '';
  }
  return config;
});
http.interceptors.response.use(
  (res) => {
    if (res.data.code != 200) {
      return Promise.reject(res.data);
    }
    return res.data;
  },
  (error) => {
    console.log(error);
  },
);
export default http;
