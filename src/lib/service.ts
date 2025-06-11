import axios from 'axios';

export const APIFetcher = (url: string): Promise<any> => {
  return axios
    .get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error.response;
    });
};
export const APIPusher = (url: string, data: any): Promise<any> => {
  return axios
    .post(url, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
};
