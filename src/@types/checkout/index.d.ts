const Database: ExternalModules.Supabase.Database;

declare namespace Checkout {
  export type Customer = {
    email: string,
    name: string,
    document_number: string,
    address: {
      street: string,
      street_number: string,
      neighborhood: string,
      zipcode: string
    },
    phone: {
      ddd: string,
      number: string
    }
  };

  export type Card = {
    card_number: string,
    card_holder_name: string,
    card_expiration_date: string,
    card_cvv: string,
    save_card: boolean,
  };

  export type PaymentRequest = {
    plan_id: number,
    card_id?: string,
    card?: Card,
    payment_method: string,
    customer: Customer,
  }

  export type Plan = {
    object: 'plan',
    id: number,
    amount: number,
    days: number,
    name: string,
    trial_days: number,
    date_created: string,
    payment_methods: string[],
    color?: any,
    charges: number,
    installments: number,
    invoice_reminder?: anyl,
    payment_deadline_charges_interval: number
  }

  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: PaymentRequest,
    }
    interface Response extends ExternalModules.Next.NextApiResponse {
      info: string;
    }
  }
}
