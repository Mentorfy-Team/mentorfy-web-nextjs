import { HttpServer } from '~/backend/helpers/HttpClient';

type Customer = Pick<
  UserTypes.PagarmeCustomer,
  | 'external_id'
  | 'name'
  | 'type'
  | 'country'
  | 'email'
  | 'documents'
  | 'phone_numbers'
>;

export const CreateCustomerPagarme = async (data: Customer) => {
  try {
    const response = await HttpServer.post<UserTypes.PagarmeCustomer>(
      '/customers',
      data,
    );

    return response;
  } catch (error) {
    return null;
  }
};
