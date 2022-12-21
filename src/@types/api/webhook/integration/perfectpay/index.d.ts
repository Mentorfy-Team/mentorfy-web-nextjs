declare namespace Webhook {
  namespace Integration {
    namespace Kiwify {
      type ApprovedPurchase = {
        token: string;
        code: string;
        sale_amount: number;
        currency_enum: number;
        coupon_code: null;
        installments: number;
        installment_amount: null;
        shipping_type_enum: number;
        shipping_amount: null;
        payment_method_enum: number;
        payment_type_enum: number;
        billet_url: string;
        billet_number: null;
        billet_expiration: null;
        quantity: number;
        sale_status_enum: number;
        sale_status_detail: string;
        date_created: Date;
        date_approved: null;
        product: Product;
        plan: Plan;
        plan_itens: any[];
        customer: Customer;
        metadata: Metadata;
        webhook_owner: string;
        commission: Commission[];
        marketplaces: Marketplaces;
      };

      type Commission = {
        affiliation_code?: string;
        affiliation_type_enum: number;
        name: string;
        email?: string;
        identification_number?: string;
        commission_amount: number;
      };

      type Customer = {
        customer_type_enum: number;
        full_name: string;
        email: string;
        identification_type: string;
        identification_number: string;
        birthday: Date;
        phone_area_code: string;
        phone_number: string;
        street_name: string;
        street_number: string;
        district: string;
        complement: string;
        zip_code: string;
        city: string;
        state: string;
        country: string;
      };

      type Marketplaces = {
        PPMPCJI1G1: Ppmpcji1G1;
      };

      type Ppmpcji1G1 = {
        name: string;
        itens: number;
        sale: number;
      };

      type Metadata = {
        src: null;
        utm_source: null;
        utm_medium: null;
        utm_campaign: null;
        utm_term: null;
        utm_content: string;
        utm_perfect: null;
      };

      type Plan = {
        code: string;
        name: string;
        quantity: number;
      };

      type Product = {
        code: string;
        name: string;
        external_reference: string;
        guarantee: number;
      };
    }
  }
}
