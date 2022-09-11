import axios from 'axios';

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const HttpClient = axios.create({
  baseURL: BaseUrl,
});
