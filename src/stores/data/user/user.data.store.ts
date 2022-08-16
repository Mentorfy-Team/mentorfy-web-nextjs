
import {HttpClient} from '~/clients';
import {AppUtil} from '~/shared/utils';
import {CookieUtil} from '~/shared/utils';
import {AppStore} from '~/stores';
import {BaseStore} from '~/stores';

class Store extends BaseStore<any> {

  private httpClient: HttpClient;

  constructor() {
    super({
      ip: null,
      email: null,
      name: {
        first: null,
        last: null,
      },
      fullName: null,
      accessToken: null,
      location: {
        city: null,
        country: null,
        latitude: null,
        longitude: null,
        state: null,
      },
      sessionStatus: null,
    }, {
      persistence: {
        storageKey: 'user-data-store',
      },
    });

    this.httpClient = new HttpClient();

    this.reaction({
      path: [ 'accessToken' ],
      callback: state => {
        state.sessionStatus.set(!!state.accessToken.get());
      },
    });

    this.reaction({
      path: [ 'name' ],
      callback: state => {
        const {first, last} = state.name;
        state.fullName.set(`${first.get()} ${last.get()}`);
      },
    });

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

    CookieUtil.merge({accessToken: response.data.accessToken});

    this.state.batch(() => {
      this.state.accessToken.set(Date.now().toString());
      this.state.email.set(response.data.email);
      this.state.name.set({
        first: response.data.firstName,
        last: response.data.lastName,
      });
    });
  }

  public signOut() {
    if(!AppUtil.isClientSide()) return;
    CookieUtil.merge({accessToken: null});
    // CookieUtil.clear();
    AppStore.resetState();
    this.resetState();
    this.state.accessToken.set(null);
  }

  public async getIp() {
    const {data} = await this.httpClient.get<any>({
      path: '/api/users/ip',
    });

    this.state.batch(state => {
      state.ip.set(data.ip);
      state.location.set({
        city: data.city,
        country: data.country,
        latitude: data.geolocation.latitude,
        longitude: data.geolocation.longitude,
        state: data.state,
      });
    });
  }

}

export const UserDataStore = new Store();
