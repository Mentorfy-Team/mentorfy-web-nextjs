import { TypeOf, literal, object, string } from 'zod';
export const checkoutCardSchema = object({
  customer: object({
    email: string().min(1, 'Email is required').email('Email is invalid'),
    name: string().min(1, 'Name is required'),
    document: string().min(1, 'Document is required'),

    address: object({
      street: string().min(1, 'Street is required'),
      number: string().min(1, 'Street number is required'),
      neighborhood: string().min(1, 'Neighborhood is required'),
      zipcode: string().min(1, 'Zipcode is required'),
    }),

    phone: object({
      ddd: string().min(1, 'DDD is required'),
      number: string().min(1, 'Number is required'),
    }),
  }),

  card: object({
    number: string().min(1, 'Card number is required'),
    name: string().min(1, 'Card holder name is required'),
    exp_month: string().min(1, 'Card expiration month is required'),
    exp_year: string().min(1, 'Card expiration year is required'),
    cvv: string().min(1, 'Card CVV is required'),
  }),

  save_card: literal(true).optional(),
});

export const checkoutPixSchema = object({
  customer: object({
    email: string().min(1, 'Email is required').email('Email is invalid'),
    name: string().min(1, 'Name is required'),
    document: string().min(1, 'Document is required'),

    address: object({
      street: string().min(1, 'Street is required'),
      number: string().min(1, 'Street number is required'),
      neighborhood: string().min(1, 'Neighborhood is required'),
      zipcode: string().min(1, 'Zipcode is required'),
    }),

    phone: object({
      ddd: string().min(1, 'DDD is required'),
      number: string().min(1, 'Number is required'),
    }),
  }),
});

export type ICheckoutCard = TypeOf<typeof checkoutCardSchema>;

export type ICheckoutPix = TypeOf<typeof checkoutPixSchema>;
