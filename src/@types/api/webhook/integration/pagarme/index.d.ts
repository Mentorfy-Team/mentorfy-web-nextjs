declare namespace Webhook {
  namespace Integration {
    namespace Pagarme {
      export interface PagarmeResponse {
        account: {
          id: string;
          name: string;
        };
        created_at: string;
        data: {
          amount: number;
          code: string;
          created_at: string;
          currency: string;
          customer: {
            created_at: string;
            delinquent: false;
            document: string;
            email: string;
            id: string;
            name: string;
            phones: {
              mobile_phone: {
                area_code: string;
                country_code: string;
                number: string;
              };
            };
            type: string;
            updated_at: string;
          };
          gateway_id: string;
          id: string;
          last_transaction: {
            amount: number;
            created_at: string;
            end_to_end_id: string;
            expires_at: string;
            gateway_id: string;
            id: string;
            payer: {
              bank_account: {
                account_number: string;
                bank_name: string;
                branch_code: string;
                ispb: string;
              };
              document: string;
              document_type: string;
              name: string;
            };
            qr_code: string;
            qr_code_url: string;
            status: string;
            success: true;
            transaction_type: string;
            updated_at: string;
          };
          order: {
            amount: number;
            closed: true;
            closed_at: string;
            code: string;
            created_at: string;
            currency: string;
            customer_id: string;
            id: string;
            status: string;
            updated_at: string;
          };
          paid_amount: number;
          paid_at: string;
          payment_method: string;
          pending_cancellation: false;
          status: string;
          updated_at: string;
        };
        id: string;
        type: string;
      }
    }
  }
}
