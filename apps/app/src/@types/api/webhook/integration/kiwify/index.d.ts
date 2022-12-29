declare namespace Webhook {
  namespace Integration {
    namespace Kiwify {
      type ApprovedPurchase = {
        order_id: string;
        order_ref: string;
        order_status: stringa;
        payment_method: string;
        store_id: string;
        payment_merchant_id: string;
        installments: 1;
        card_type: string;
        card_last4digits: string;
        card_rejection_reason: null;
        pix_code: null;
        pix_expiration: null;
        boleto_URL: null;
        sale_type: string;
        created_at: string;
        updated_at: string;
        Product: {
          product_id: string;
          product_name: string;
        };
        Customer: {
          full_name: string;
          email: string;
          mobile: {
            ddd: string;
            number: string;
          };
          CPF: null;
          ip: string;
        };
        Commissions: {
          charge_amount: string;
          product_base_price: string;
          kiwify_fee: string;
          commissioned_stores: [
            {
              id: string;
              type: string;
              custom_name: string;
              email: string;
              value: string;
            },
          ];
          my_commission: string;
          funds_status: null;
          estimated_deposit_date: null;
          deposit_date: null;
        };
        TrackingParameters: {
          src: null;
          sck: null;
          utm_source: null;
          utm_medium: null;
          utm_campaign: null;
          utm_content: null;
          utm_term: null;
        };
        Subscription: {
          id: string;
          start_date: string;
          next_payment: string;
          status: string;
          plan: {
            id: string;
            name: string;
            frequency: string;
            qty_charges: 0;
          };
          charges: {
            completed: [
              {
                order_id: string;
                amount: 11307;
                status: string;
                installments: 1;
                card_type: string;
                card_last_digits: string;
                card_first_digits: string;
                created_at: string;
              },
            ];
            future: [
              {
                charge_date: string;
              },
              {
                charge_date: string;
              },
              {
                charge_date: string;
              },
            ];
          };
        };
        subscription_id: string;
        access_url: string;
      };
    }
  }
}
