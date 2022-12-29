import { HttpClient } from '@app/services/HttpClient';
export const fetcher = (url) => HttpClient.get(url).then((res) => res.data);
export const post = (url) => HttpClient.post(url).then((res) => res.data);
export const del = (url) => HttpClient.delete(url).then((res) => res.data);
export const put = (url) => HttpClient.put(url).then((res) => res.data);
