import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.124:3333', //rodando o backend no próprio pc (ip do expo)
});

export default api;