
import clone from 'clone';

export class DataUtil {

  public static deepClone<T>(obj: T): T {
    return clone<T>(obj);
  }

}
