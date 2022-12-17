const Database: ExternalModules.Supabase.Database;

declare namespace Checkout {
  export type Payment = {
    type: string;
    card: Card;
  };

  export type Card = {
    number: string;
    expiration: string;
    cvv: string;
    instalments: number;
    save: boolean;
  };

  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: {
        email: string;
        name: string;
        phone: string;
        cpf: string;
        payment: Payment;
      };
    }

    interface Response extends ExternalModules.Next.NextApiResponse {
      info: string;
    }
  }
}
