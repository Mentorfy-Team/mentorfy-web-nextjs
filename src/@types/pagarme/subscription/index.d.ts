declare namespace Pagarme {
  declare namespace Subscription {
    export type Response = {
      id: string;
      code: string;
      start_at: string;
      interval: string;
      interval_count: number;
      billing_type: string;
      current_cycle: {
        id: string;
        start_at: string;
        end_at: string;
        billing_at: string;
        status: string;
        cycle: number;
      };
      next_billing_at: string;
      payment_method: string;
      currency: string;
      statement_descriptor: string;
      installments: number;
      status: string;
      created_at: string;
      updated_at: string;
      customer: {
        id: string;
        name: string;
        email: string;
        delinquent: false;
        created_at: string;
        updated_at: string;
        phones?: Phones;
      };
      card: {
        id: string;
        first_six_digits: string;
        last_four_digits: string;
        brand: string;
        holder_name: string;
        exp_month: number;
        exp_year: number;
        status: string;
        type: string;
        created_at: string;
        updated_at: string;
      };
      plan: Plan;
      items: {
        id: string;
        name: string;
        description: string;
        quantity: number;
        status: string;
        created_at: Date;
        updated_at: Date;
        pricing_scheme: {
          scheme_type: string;
          price_brackets: [
            {
              start_quantity: number;
              end_quantity: number;
              price: number;
              overage_price: number;
            },
          ];
        };
      }[];
      metadata: {
        id: string;
      };
    };

    export type Request = {
      plan_id: string;
      payment_method: string;
      customer_id?: string;
      customer?: Pick<Customer, 'name' | 'email' | 'phones'>;
      card?: Card;
      card_id?: string;
      metadata?: {
        id: string;
      };
    };
  }
}
