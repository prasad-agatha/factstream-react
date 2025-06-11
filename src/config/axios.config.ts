import axios from 'axios';
// constants
import {BASE_LOCAL} from 'src/lib/constants/endpoints';

if (process.env.APP_ENV === 'production') {
  axios.defaults.baseURL = BASE_LOCAL;
} else if (process.env.APP_ENV === 'staging') {
  axios.defaults.baseURL = BASE_LOCAL;
} else {
  axios.defaults.baseURL = BASE_LOCAL;
}

export function setAxiosHeader(token: string): void {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + token;
  } else {
    axios.defaults.headers.common['Authorization'] = '';
  }
}
