import axios from 'axios';

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    'X-API-KEY': __API_KEY__,
    'Content-Type': 'application/json',
  },
});
