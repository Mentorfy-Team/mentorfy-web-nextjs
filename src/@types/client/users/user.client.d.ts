const Database: ExternalModules.Supabase.Database;

declare namespace UserClient {
  type User = ExternalModules.Supabase.User;
  type Profile = typeof Database.public.Tables.profile.Row;
  type Address = typeof Database.public.Tables.address.Row;
  type Product = typeof Database.public.Tables.product.Row;

  type SignUp = {
    name: string;
    email: string;
    phone?: string;
    password: string;
    confirmPassword: string;
    policies: boolean;
  };

  type CreateClient = Pick<SignUp, 'name' | 'email' | 'phone'> & {
    product: string;
  };

  type ClientRelation = Pick<Profile, 'name' | 'email' | 'phone' | 'id'> & {
    products: Pick<Product, 'title' | 'id' | 'created_at'> &
      {
        subscribed_at: string;
      }[];
  };

  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: CreateClient;
    }

    type Response = {
      error: string;
    };

    type ClientsResponse = {
      result?: {
        clients: ClientRelation[];
        statistics: { totalClients: number; totalAccesses: number };
      };
      error?: string;
    };
  }
}
