declare namespace Webhook {
  namespace Integration {
    namespace Hotmart {
      type ApprovedPurchase = {
        data: {
          product: {
            has_co_production: false;
            name: string;
            id: 0;
            ucode: string;
          };
          commissions: [any, any];
          purchase: {
            offer: {
              key: string;
            };
            order_date: 1511783344000;
            original_offer_price: any;
            price: any;
            checkout_country: any;
            buyer_ip: string;
            order_bump: any;
            payment: any;
            approved_date: 1511783346000;
            full_price: any;
            transaction: string;
            status: string;
          };
          affiliates: [any];
          producer: { name: string };
          subscription: {
            subscriber: any;
            plan: any;
            status: string;
          };
          buyer: {
            name: string;
            checkout_phone: string;
            email: string;
          };
        };
        hottok: string;
        id: string;
        creation_date: number;
        event: string;
        version: string;
      };
    }
  }
}
