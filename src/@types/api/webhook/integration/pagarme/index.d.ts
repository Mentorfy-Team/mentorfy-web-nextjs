declare namespace Webhook {
  namespace Integration {
    namespace Pagarme {
      export type Transaction = {
        acquirer_id: string;
        acquirer_name: string;
        acquirer_response_code: string;
        acquirer_response_message: string;
        addition: string;
        address: string;
        amount: string;
        antifraud_score: string;
        authorization_code: string;
        authorized_amount: string;
        billing: string;
        boleto: string;
        boleto_barcode: string;
        boleto_expiration_date: string;
        boleto_url: string;
        capture_method: string;
        card: string;
        card_brand: string;
        card_first_digits: string;
        card_holder_name: string;
        card_last_digits: string;
        card_magstripe_fallback: string;
        card_pin_mode: string;
        cost: string;
        customer: {
          birthday: string;
          born_at: string;
          client_since: string;
          country: string;
          date_created: string;
          document_number: string;
          document_type: string;
          documents: {
            id: string;
            number: string;
            object: string;
            type: string;
          }[];
          email: string;
          external_id: string;
          gender: string;
          id: string;
          name: string;
          object: string;
          phone_numbers: string[];
          risk_indicator: string;
          type: string;
        };
        cvm_pin: string;
        date_created: string;
        date_updated: string;
        device: string;
        discount: string;
        fraud_covered: string;
        fraud_reimbursed: string;
        id: string;
        installments: string;
        ip: string;
        local_time: string;
        local_id: string;
        nsu: string;
        object: string;
        order_id: string;
        paid_amount: string;
        payment: string;
        payment_method: string;
        phone: string;
        pix_data: string;
        pix_expiration_date: string;
        pix_qr_code: string;
        postback_url: string;
        private_label: string;
        receipt_url: string;
        reference_key: string;
        referer: string;
        refunded_amount: string;
        refuse_reason: string;
        risk_level: string;
        shipping: string;
        soft_descriptor: string;
        split_rules: string;
        status: string;
        status_reason: string;
        subscription_id: string;
        tid: string;
      };
      export interface PagarmeResponse {
        current_status: string;
        desired_status: string;
        event: string;
        fingerprint: string;
        id: string;
        object: string;
        old_status: string;
        transaction: Transaction;
      }
    }
  }
}
