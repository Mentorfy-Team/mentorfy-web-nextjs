declare namespace Pagarme {
  export type Address = {
    country?: 'br';
    state?: string;
    city?: string;
    zipcode?: string;
    line_1?: string;
    line_2?: string;
  };

  export type Plan = {
    id: string;
    name: string;
    description: string;
    url: string;
    statement_descriptor: string;
    interval: string;
    interval_count: number;
    billing_type: string;
    payment_methods: string[]; // 'credit_card', 'debit_card'
    installments: [number];
    status: string;
    currency: string;
    created_at: string;
    updated_at: string;
    items: Item[];
  };

  export type Card = {
    id?: string;
    holder_name?: string;
    number?: string;
    exp_month?: number;
    exp_year?: number;
    cvv?: string;
  };

  export type Phones = {
    home_phone?: {
      country_code?: string;
      number?: string;
      area_code?: string;
    };
    mobile_phone?: {
      country_code?: string;
      number?: string;
      area_code?: string;
    };
  };

  export type Customer = {
    id?: string;
    name?: string;
    email?: string;
    type?: 'individual' | 'company';
    code?: string;
    document?: string;
    phones?: Phones;
    address?: Address;
  };
}
