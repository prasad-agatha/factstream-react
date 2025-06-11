import axios from 'axios';
// services
import APIService from 'src/services/APIService';
// endpoints
import {CREATE_USER, AUTH_LOGIN, GET_USER, LOG_OUT} from '../lib/constants/endpoints';

// react router
import {useHistory} from 'react-router-dom';
// const history = useHistory();
class AuthService extends APIService {
  static create(data = {}): Promise<any> {
    return axios
      .post(CREATE_USER, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static async getUser() {
    return axios
      .get(GET_USER)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
  static async login(data) {
    return axios
      .post(AUTH_LOGIN, data)
      .then((response) => {
        console.log(response);

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error.response.data;
      });
  }

  authenticateUser(accessToken: string): void {
    // const history = useHistory();
    this.setAccessToken(accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // Router.push('/dashboard');
    // history.push('/dashboard');
  }

  logout() {
    // const history = useHistory();
    return axios
      .get(LOG_OUT)
      .then(() => {
        // return response.data;
        this.purgeAuth();
        // Router.push('/auth/signin');
        // history.push('/auth/signin');
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default AuthService;
