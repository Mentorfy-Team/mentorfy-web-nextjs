const Database: ExternalModules.Supabase.Database;

declare namespace ProductTypes {
  type Product = typeof Database.public.Tables.product.Row & {
    extra: any;
  };
  type Address = typeof Database.public.Tables.address.Row;

  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: any;
    }

    type Response = {
      error: string;
    };

    type ClientsResponse = {
      error?: string;
    };
  }
}
