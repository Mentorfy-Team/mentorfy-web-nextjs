const Database: ExternalModules.Supabase.Database;

declare namespace MemberAreaTypes {
  type Subscription = typeof Database.public.Tables.client_product.Row;
  type Address = typeof Database.public.Tables.address.Row;
  type MemberArea = {
    id: string;
    title: string;
    status: boolean;
    member_area: {
      id: string;
    }[];
    clients: number;
  };

  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: any;
    }

    type Response = {
      error: string;
    };
  }
}
