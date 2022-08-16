import axios from 'axios';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export class HttpClient {
  private baseUrl: string;

  constructor({ baseUrl }: { baseUrl?: string } = {}) {
    this.baseUrl = baseUrl ?? NEXT_PUBLIC_BASE_URL;
  }

  public get<T>({ path, config }: any) {
    return axios.get<T>(`${this.baseUrl}/${path}`, config);
  }
}
