import axios from 'axios';
import LogAPI from './logApi';
import RegisterAPI from './registerApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class API {
  #axios;
  register;
  log;
  constructor() {
    this.#axios = axios.create({ baseURL: API_BASE_URL, withCredentials: true });
    this.register = new RegisterAPI(this.#axios);
    this.log = new LogAPI(this.#axios);
  }
}

const api = new API();
export default api;
