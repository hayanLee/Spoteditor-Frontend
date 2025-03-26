import axios from 'axios';
import LogAPI from './logApi';
import PlaceAPI from './placeApi';
import RegisterAPI from './registerApi';
import FollowAPI from './followApi';
import NotificationAPI from './notificationApi';
import UserLogAPI from './userLogApi';
import { OtherUserAPI, UserAPI } from './userApi';
import SearchLog from './searchLog.Api';
import { AuthClient } from './authApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class API {
  #axios;
  #authClient;
  user;
  register;
  log;
  userLog;
  place;
  follow;
  otherUser;
  searchLog;
  notification;
  constructor() {
    this.#authClient = new AuthClient(API_BASE_URL).getInstance();
    this.#axios = axios.create({ baseURL: API_BASE_URL, withCredentials: true });
    this.user = new UserAPI(this.#authClient);
    this.otherUser = new OtherUserAPI(this.#axios);
    this.userLog = new UserLogAPI(this.#authClient);
    this.register = new RegisterAPI(this.#authClient);
    this.log = new LogAPI(this.#authClient);
    this.place = new PlaceAPI(this.#axios);
    this.follow = new FollowAPI(this.#axios);
    this.searchLog = new SearchLog(this.#axios);
    this.notification = new NotificationAPI(this.#axios);
  }
}

const api = new API();
export default api;
