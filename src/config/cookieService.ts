import cookie from 'js-cookie';

class CookieService {
  static getToken(name) {
    return cookie.get(name);
  }

  static setToken(name, value) {
    cookie.set(name, value);
  }
}

export default CookieService;
