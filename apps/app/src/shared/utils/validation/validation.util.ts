
import * as yup from 'yup';

export class ValidationUtil {

  public static base() {
    return yup.object();
  }

  public static naming() {
    return yup.string()
      .required('Name required.')
      .min(2, 'Names must have 2 or more characters.')
      .max(32, 'Names must must have 32 characters max.');
  }

  public static password() {
    return yup.string()
      .required('Password required.')
      .min(8)
      .max(24);
  }

  public static email() {
    return yup.string()
      .required('Email required.')
      .email('Invalid e-mail.');
  }
}

