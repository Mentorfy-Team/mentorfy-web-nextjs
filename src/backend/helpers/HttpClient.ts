import axios from 'axios';

const BaseUrl = process.env.PAGARME_BASE_URL;
const ApiKey = process.env.PAGARME_API_KEY;

export const HttpServer = axios.create({
  baseURL: BaseUrl,
  params: {
    api_key: ApiKey
  },
  headers: { accept: 'application/json', 'content-type': 'application/json' },
});
