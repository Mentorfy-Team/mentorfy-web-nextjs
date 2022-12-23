import { TypeOf, literal, number, object, preprocess, string } from 'zod';
export const checkoutCardSchema = object({
  customer: object({
    email: string().min(1, 'Email is required').email('Email is invalid'),
    name: string().min(1, 'Name is required'),
    document: string().min(1, 'Document is required'),
    type: literal('individual').optional().default('individual'),

    phones: object({
      mobile_phone: object({
        area_code: string().min(1, 'DDD is required'),
        number: string().min(1, 'Number is required'),
        country_code: string().optional().default('55'),
      }),
    }).optional(),
  }),

  card: object({
    number: string().min(1, 'Card number is required'),
    holder_name: string().min(1, 'Card holder name is required'),
    exp_month: preprocess(Number, number()),
    exp_year: preprocess(Number, number()),
    cvv: string().min(1, 'Card CVV is required'),
  }).required(),

  save_card: literal(true).optional(),
});

export const checkoutPixSchema = object({
  customer: object({
    email: string().min(1, 'Email is required').email('Email is invalid'),
    name: string().min(1, 'Name is required'),
    document: string().min(1, 'Document is required'),
    type: literal('individual').optional().default('individual'),

    phones: object({
      mobile_phone: object({
        area_code: string().min(1, 'DDD is required'),
        number: string().min(1, 'Number is required'),
        country_code: string().optional().default('55'),
      }),
    }),
  }),
});

export type ICheckoutCard = TypeOf<typeof checkoutCardSchema>;

export type ICheckoutPix = TypeOf<typeof checkoutPixSchema>;
