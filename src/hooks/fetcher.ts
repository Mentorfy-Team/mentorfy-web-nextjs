import { HttpClient } from '~/services/HttpClient';
export const fetcher = (url) => HttpClient.get(url).then((res) => res.data);
