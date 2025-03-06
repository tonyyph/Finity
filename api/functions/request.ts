import queryString from 'query-string';
import axios, { setDefaultHeaders } from './axios';
import { DeviceEventEmitter } from 'react-native';
// import refeshToken from './refeshToken';

export const buildURL = (url: string, query?: Record<string, any> | string): string => {
  let _url = url;
  if (query) {
    _url += /\?/.test(url) ? '&' : '?';
    _url += typeof query === 'object' ? queryString.stringify(query) : query;
  }
  return _url;
};

type RequestParams = {
  method?: 'get' | 'post' | 'put' | 'delete';
  url: string;
  query?: Record<string, any> | string;
  params?: any;
  success?: (data: any) => void;
  failure?: (error: any) => void;
  headers?: Record<string, string>;
};

async function request({
  method = 'get',
  url,
  query,
  params,
  success,
  failure,
  headers,
}: RequestParams): Promise<void> {
  axios.interceptors.request.use(
    async (config) => {
      // try {
      //   const session = await refeshToken();
      //   const accessToken = session.getAccessToken().getJwtToken();
      //   setAccessToken(accessToken);
      //   setDefaultHeaders({ Authorization: `Bearer ${accessToken}` });
      //   config.headers['Authorization'] = `Bearer ${accessToken}`;
      // } catch (error) {
      //   // Handle token refresh error
      // }
      return config;
    },
    async (error) => {
      DeviceEventEmitter.emit('TokenExpire');
      return Promise.reject(error);
    }
  );

  const axiosMethod = axios[method];

  if (typeof axiosMethod === 'function') {
    try {
      const result =
        method === 'get' || method === 'delete'
          ? await axiosMethod(buildURL(url, query), { headers })
          : await axiosMethod(buildURL(url, query), params, { headers });
      if (result.status === 200 || result.status === 201) {
        if (typeof success === 'function') {
          return success(result.data);
        }
      } else {
        return failure?.({ message: result?.data });
      }
    } catch (err: any) {
      const result = err?.toJSON?.();
      if (typeof failure === 'function') {
        if (err?.response?.status === 401) {
          DeviceEventEmitter.emit('TokenExpire');
        }
        if (err?.response?.data) {
          return failure(err?.response?.data);
        } else {
          return failure({ message: result?.message });
        }
      }
    }
  }
}

export { request };