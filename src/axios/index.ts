import axios from 'axios';

import { ElMessage, ElLoading } from 'element-plus';

const configBaseUrl = 'http://localhost:5656/';

let loadingInstance: any = null;

//create方法创建axios实例
export const axiosService = axios.create({
  timeout: 10000,
  baseURL: configBaseUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

axiosService.interceptors.request.use((config) => {
  loadingInstance = ElLoading.service({
    lock: true,
    text: 'loading...'
  });
  return config;
});

// 添加响应拦截器
axiosService.interceptors.response.use(
  (response) => {
    try {
      loadingInstance.close();
    } catch (err) {
      console.log(err);
    }
    return response.data;
  },
  (error) => {
    console.log('TCL: error', error);
    const msg = error.Message !== undefined ? error.Message : '';
    ElMessage({
      message: '网络错误' + msg,
      type: 'error',
      duration: 3 * 1000
    });
    loadingInstance.close();
    return Promise.reject(error);
  }
);

export default axiosService;
