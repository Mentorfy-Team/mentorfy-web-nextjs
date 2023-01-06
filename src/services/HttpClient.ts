import axios from 'axios';

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const BaseAPIUrl = process.env.NEXT_PUBLIC_API_URL;

export const HttpClient = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
  timeout: 25000,
});

export const HttpServer = axios.create({
  baseURL: BaseAPIUrl,
  withCredentials: true,
  timeout: 25000,
});
