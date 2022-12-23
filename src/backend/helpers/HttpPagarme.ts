import axios from 'axios';

const BaseUrl = process.env.PAGARME_BASE_URL;
const PAGARME_SECRET = process.env.PAGARME_SECRET;

export const HttpPagarme = axios.create({
  baseURL: BaseUrl,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization:
      'Basic ' + Buffer.from(`${PAGARME_SECRET}:`).toString('base64'),
  },
});
