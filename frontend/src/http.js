import axios from 'axios';

export const publicApi = axios.create({
  baseURL: 'http://localhost:3005',
});

export const privateApi = axios.create({
  baseURL: 'http://localhost:3005',
});

export const token = {
  set: (token) => {
    console.log(token)

    privateApi.defaults.headers.Authorization = token;
  },
  remove: () => {
    privateApi.defaults.headers.Authorization = null;
  },
};
