import { default as cookieHelper } from 'cookie';
import { AppUtil } from '..';

export class CookieUtil {
  public static toJson(cookie: string) {
    const parsed = cookieHelper.parse(cookie);
    return parsed;
  }

  public static fromJson(cookie: { [key: string]: string }) {
    let parsed: string = '';
    Object.keys(cookie).forEach((k, index, list) => {
      parsed += `${cookieHelper.serialize(k, cookie[k])}`;
      if (index < list.length - 1) parsed += '; ';
    });
    return parsed;
  }

  public static get(): any {
    this.checkEnv();
    const { accessToken } = this.toJson(document.cookie);
    return {
      accessToken: accessToken === 'null' ? null : accessToken,
    };
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
    for (var i = 0; i < cookies.length; i++) {
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
