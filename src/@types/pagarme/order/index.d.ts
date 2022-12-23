declare namespace Pagarme {
  export type CreditCard = {
    operation_type: 'auth_only' | 'auth_and_capture' | 'pre_auth';
    installments: number;
    statement_descriptor: string;
    card: Card;
    card_id: string;
    card_token: string;
  };

  export type Payment = {
    method:
      | 'credit_card'
      | 'boleto'
      | 'voucher'
      | 'bank_transfer'
      | 'safety_pay'
      | 'checkout'
      | 'cash'
      | 'pix';
    credit_card: CreditCard;
    pix: Pix;
    amount: number;
    split: {
      amount: string;
      reciplent_id: string;
      type: 'flat' | 'percentage';
      options: {
        charge_remainder_fee: boolean;
        charge_processing_fee: boolean;
        liable: boolean;
      };
    }[];
  };

  export type Item = {
    amount: number;
    description: string;
    quantity: number;
    code: string;
  };

  export type OrderRequest = {
    code?: string;
    customer?: Customer;
    items?: Item[];
    payment: Payment;
    closed: boolean;
    metadata: any;
    device: any;
    location: any;
    ip: string;
    session_id: string;
    antifraud_enabled: boolean;
    antifraud: any;
  };
}
