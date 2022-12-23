declare namespace Pagarme {
  declare namespace Pix {
    export type Request = {
      items: Item[];
      customer: Customer;
      payments: [
        {
          payment_method: string;
          pix: {
            expires_in: number;
            expires_at?: Date;
            additional_information?: {
              name: string;
              value: string;
            };
          };
        },
      ];
    };
    export type Response = {
      id: string;
      code: string;
      amount: number;
      currency: string;
      closed: true;
      items: {
        id: string;
        type: string;
        description: string;
        amount: number;
        quantity: number;
        status: string;
        created_at: string;
        updated_at: string;
        code: string;
      }[];
      customer: {
        id: string;
        name: string;
        email: string;
        document: string;
        type: string;
        delinquent: false;
        created_at: string;
        updated_at: string;
        phones: {
          home_phone: {
            country_code: string;
            number: string;
            area_code: string;
          };
        };
      };
      status: string;
      created_at: string;
      updated_at: string;
      closed_at: string;
      charges: {
        id: string;
        code: string;
        gateway_id: string;
        amount: number;
        status: string;
        currency: string;
        payment_method: string;
        created_at: string;
        updated_at: string;
        customer: {
          id: string;
          name: string;
          email: string;
          document: string;
          type: string;
          delinquent: false;
          created_at: string;
          updated_at: string;
          phones: {
            home_phone: {
              country_code: string;
              number: string;
              area_code: string;
            };
          };
        };
        last_transaction: {
          qr_code: string;
          qr_code_url: string;
          expires_at: string;
          additional_information: [
            {
              name: string;
              value: string;
            },
          ];
          id: string;
          transaction_type: string;
          gateway_id: string;
          amount: 1;
          status: string;
          success: true;
          created_at: string;
          updated_at: string;
          gateway_response: any;
          antifraud_response: any;
          metadata: any;
        };
      }[];
    };
  }
}
