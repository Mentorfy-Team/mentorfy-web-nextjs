declare namespace Pagarme {
  declare namespace Plan {
    export type Response = {
      id: string;
      name: string;
      description: string;
      url: string;
      statement_descriptor: string;
      interval: string;
      interval_count: number;
      billing_type: string;
      payment_methods: string[];
      installments: [number];
      status: string;
      currency: string;
      created_at: string;
      updated_at: string;
      items: [
        {
          id: string;
          name: string;
          description: string;
          quantity: number;
          status: string;
          created_at: string;
          updated_at: string;
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
        },
      ];
    };
  }
}
