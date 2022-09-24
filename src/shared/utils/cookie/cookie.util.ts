import { default as cookieHelper } from 'cookie';
import { AppUtil } from '..';

export class CookieUtil {
  public static fromReq(req: any) {
    if (!req?.headers?.cookie) {
      throw new Error('Não foi possível encontrar os cookies.');
    }
    const cookie = this.toJson(req?.headers?.cookie)['sb-access-token'];
    if (!cookie) {
      throw new Error(
        'Não foi possível encontrar os cookies. Verifique seu serviço.',
      );
    }
    return this.toJson(req.headers.cookie)['sb-access-token'];
  }

  public static toJson(cookie: string) {
    const parsed = cookieHelper.parse(cookie);
    return parsed;
  }

  public static fromJson(cookie: { [key: string]: string }) {
    let parsed = '';
    Object.keys(cookie).forEach((k, index, list) => {
      parsed += `${cookieHelper.serialize(k, cookie[k])}`;
      if (index < list.length - 1) parsed += '; ';
    });
    return parsed;
  }

  public static get(): any {
    this.checkEnv();
    return this.toJson(document.cookie);
  }

  public static set(cookie: { [key: string]: string }): string {
    this.checkEnv();
    document.cookie = this.fromJson(cookie);
    return document.cookie;
  }

  public static merge(cookie: any) {
    this.checkEnv();
    const current = this.toJson(document.cookie);
    const result = this.set({
      ...current,
      ...cookie,
    });
    return result;
  }

  public static clear() {
    this.checkEnv();
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  private static checkEnv() {
    if (!AppUtil.isClientSide()) {
      throw new Error('Cannot set on server side.');
    }
  }
}
