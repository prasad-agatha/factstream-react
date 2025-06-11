import APIService from './APIService';

class StorageService extends APIService {
  setItem(name: string, data: any) {
    return localStorage.setItem(name, JSON.stringify(data));
  }

  getItem(name: string) {
    const data = localStorage.getItem(name);
    return JSON.parse(data);
  }

  removeItem(name: string) {
    return localStorage.removeItem(name);
  }
}

export default StorageService;
