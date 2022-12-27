import { HttpPagarme } from '~/backend/helpers/HttpPagarme';

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
    const response = await HttpPagarme.post<UserTypes.PagarmeCustomer>(
      '/customers',
      data,
    );

    return response;
  } catch (error) {
    return null;
  }
};
