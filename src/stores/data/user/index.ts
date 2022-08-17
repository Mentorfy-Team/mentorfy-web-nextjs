import { atom } from 'jotai';
import { HttpClient } from '~/backend/clients';
import { AppUtil } from '~/shared/utils';
import { CookieUtil } from '~/shared/utils';
import { AppStore } from '~/stores';
import { BaseStore } from '~/stores/base';

type State = {
  accessToken: string;
  name: string;
  email: string;
  id: number;
  role: string;
  avatar: string;
};

class Store extends BaseStore<Partial<State>> {
  private httpClient: HttpClient;

  constructor() {
    super(
      {
        id: 0,
        email: null,
        name: 'John Doe',
        accessToken: null,
        role: null,
        avatar: null,
      },
      {
        persistence: {
          storageKey: 'user-data-store',
        },
      },
    );

    this.httpClient = new HttpClient();
  }

  public async signUp(values: any) {
    const response = await this.httpClient.post<any>({
      path: '/api/users',
      config: {
        data: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
        },
      },
    });

    CookieUtil.merge({ accessToken: response.data.accessToken });

    atom(null, (get, set, update) => {
      set(this.state, {
        accessToken: Date.now().toString(),
        email: response.data.email,
        name: response.data.name,
        id: response.data.id,
        role: response.data.role,
        avatar: response.data.avatar,
      });
    });
  }

  public signOut() {
    if (!AppUtil.isClientSide()) return;
    CookieUtil.merge({ accessToken: null });
    // CookieUtil.clear();
    AppStore.resetState();
    this.resetState();
    this.state.write(null, null, {
      accessToken: null,
    });
  }

  public async getId() {
    const { data } = await this.httpClient.get<any>({
      path: '/api/users/id',
    });

    this.state.write(null, null, {
      id: data.id,
    });
  }
}

export default new Store();
