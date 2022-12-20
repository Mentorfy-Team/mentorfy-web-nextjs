const Database: ExternalModules.Supabase.Database;

declare namespace Checkout {
  export type Customer = {
    id: string;
    email: string;
    name: string;
    document_number: string;
    address: {
      street: string;
      street_number: string;
      neighborhood: string;
      zipcode: string;
    };
    phone: {
      ddd: string;
      number: string;
    };
  };

  export type Card = {
    object: 'card';
    id: string;
    date_created: Date;
    date_updated: Date;
    brand: string;
    holder_name: string;
    first_digits: string;
    last_digits: string;
    country: string;
    fingerprint: string;
    valid: true;
    expiration_date: string;
  };

  export type PaymentRequest = {
    plan_id: number;
    card_id?: string;
    card?: {
      card_number: string;
      card_holder_name: string;
      card_expiration_date: string;
      card_cvv: string;
    };
    payment_method: string;
    customer: Customer;
    save_card?: boolean;
  };

  export type Subscription = {
    object: 'subscription';
    plan: Plan;
    id: number;
    current_transaction: any;
    postback_url: string;
    payment_method: 'credit_card';
    card_brand: string;
    card_last_digits: string;
    current_period_start: Date;
    current_period_end: Date;
    charges: number;
    soft_descriptor: any;
    status: string;
    date_created: Date;
    date_updated: Date;
    phone: {
      object: string;
      ddi: string;
      ddd: string;
      number: string;
      id: number;
    };
    address: {
      object: string;
      street: string;
      complementary: null;
      street_number: string;
      neighborhood: string;
      city: string;
      state: string;
      zipcode: string;
      country: string;
      id: number;
    };
    customer: Customer;
    card: Card;
    metadata: null;
    fine: any;
    interest: any;
    settled_charges: null;
    manage_token: string;
    manage_url: string;
  };

  export type Plan = {
    object: 'plan';
    id: number;
    amount: number;
    days: number;
    name: string;
    trial_days: number;
    date_created: string;
    payment_methods: string[];
    color?: any;
    charges: number;
    installments: number;
    invoice_reminder?: anyl;
    payment_deadline_charges_interval: number;
  };

  export type PixRequest = {
    payment_method: 'pix';
    pix_expiration_date: date;
    amount: number;
    customer: {
      external_id: string;
      email: string;
      name: string;
      type: 'individual';
      country: 'br';
      documents: [
        {
          type: 'cpf';
          number: string;
        },
      ];
      phone_numbers: string[];
    };
    postback_url: string;
  };

  export type PixResponse = {
    object: 'transaction';
    status: 'waiting_payment';
    refuse_reason: null;
    status_reason: 'acquirer';
    acquirer_response_code: null;
    acquirer_response_message: null;
    acquirer_name: 'pagarme';
    acquirer_id: string;
    authorization_code: null;
    soft_descriptor: null;
    tid: number;
    nsu: number;
    date_created: Date;
    date_updated: Date;
    amount: number;
    authorized_amount: number;
    paid_amount: number;
    refunded_amount: number;
    installments: 1;
    id: number;
    cost: number;
    card_holder_name: null;
    card_last_digits: null;
    card_first_digits: null;
    card_brand: null;
    card_pin_mode: null;
    card_magstripe_fallback: false;
    cvm_pin: false;
    postback_url: null;
    payment_method: 'pix';
    capture_method: 'ecommerce';
    antifraud_score: null;
    boleto_url: null;
    boleto_barcode: null;
    boleto_expiration_date: null;
    boleto: null;
    referer: 'api_key';
    ip: string;
    subscription_id: null;
    phone: null;
    address: null;
    customer: Customer;
    billing: null;
    shipping: null;
    items: [];
    card: null;
    split_rules: null;
    metadata: any;
    antifraud_metadata: any;
    reference_key: null;
    device: null;
    local_transaction_id: null;
    local_time: null;
    fraud_covered: false;
    fraud_reimbursed: null;
    order_id: null;
    risk_level: string;
    receipt_url: null;
    payment: null;
    addition: null;
    discount: null;
    private_label: null;
    pix_data: null;
    pix_qr_code: string;
    pix_expiration_date: Date;
  };

  export type Customer = {
    object: 'customer';
    id: number;
    external_id: string; // Profile_ID
    type: 'individual';
    country: 'br';
    document_number: null;
    document_type: 'cpf';
    name: string;
    email: string;
    phone_numbers: string[];
    born_at: null;
    birthday: null;
    gender: null;
    date_created: Date;
    documents: [
      {
        object: 'document';
        id: string;
        type: 'cpf';
        number: string;
      },
    ];
    client_since: null;
    risk_indicator: null;
  };

  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: PaymentRequest;
    }
    interface Response extends ExternalModules.Next.NextApiResponse {
      info: string;
    }
  }
}
