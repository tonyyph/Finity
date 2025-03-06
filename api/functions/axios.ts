import axios, { AxiosInstance } from 'axios';

type Headers = Record<string, string>;

const instance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  // timeout: 20000, //parseInt(CONFIG.TIME_OUT),
});

export function setDefaultHeaders(headers: Headers): void {
  Object.keys(headers).forEach((key) => {
    instance.defaults.headers.common[key] = headers[key];
  });
}

export default instance;
