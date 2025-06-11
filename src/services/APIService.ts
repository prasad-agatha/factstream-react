import axios, {AxiosRequestConfig} from 'axios';
// cookie
import cookie from 'js-cookie';

abstract class APIService {
  getRequestConfig(options = {}): AxiosRequestConfig {
    return {...options};
  }

  //Passing bearer for all api calls
  getAxiosHeaders(): any {
    const token = cookie.get('accessToken');
    return {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  }
  // Setting access token in a cookie
  setAccessToken(token: string): void {
    cookie.set('accessToken', token);
  }
  // Setting refresh token in a cookie
  setRefreshToken(token: string): void {
    cookie.set('refreshToken', token);
  }

  purgeAuth(): void {
    cookie.remove('accessToken');
    // cookie.remove("refreshToken");
  }

  get(url: string, options = {}): Promise<any> {
    return axios({
      method: 'GET',
      url,
      ...options,
    });
  }

  post(url: string, data = {}, options = {}): Promise<any> {
    return axios({
      method: 'POST',
      url,
      data,
      ...options,
    });
  }

  put(url: string, data = {}, options = {}): Promise<any> {
    return axios({
      method: 'PUT',
      url,
      data,
      ...options,
    });
  }

  delete(url: string, options = {}): Promise<any> {
    return axios({
      method: 'DELETE',
      url,
      ...options,
    });
  }
}

export default APIService;
