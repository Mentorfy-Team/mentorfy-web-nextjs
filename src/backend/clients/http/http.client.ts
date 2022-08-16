
import axios, {AxiosRequestConfig} from 'axios';

const {NEXT_PUBLIC_BASE_URL} = process.env;

export class HttpClient {

  private baseUrl: string;

  constructor({baseUrl}: { baseUrl?: string; } = { }) {
    this.baseUrl = baseUrl || NEXT_PUBLIC_BASE_URL;
  }

  public async get<T>({path, config = { }}: any) {
    config.method = 'GET';
    const response = await this.req<T>({config, path});
    return response;
  }

  public async post<T>({path, config = { }}: any) {
    config.method = 'POST';
    const response = await this.req<T>({config, path});
    return response;
  }

  public async patch<T>({path, config = { }}: any) {
    config.method = 'PATCH';
    const response = await this.req<T>({config, path});
    return response;
  }

  public async put<T>({path, config = { }}: any) {
    config.method = 'PUT';
    const response = await this.req<T>({config, path});
    return response;
  }

  public async del<T>({path, config = { }}: any) {
    config.method = 'DELETE';
    const response = await this.req<T>({config, path});
    return response;
  }

  public async req<T>({path, config}: {path: string, config: AxiosRequestConfig}) {
    const response = await axios.request<T>({
      ...config,
      url: this.baseUrl + path,
    });
    return response;
  }

}
