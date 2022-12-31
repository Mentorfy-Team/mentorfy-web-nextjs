const Database: ExternalModules.Supabase.Database;

declare namespace ClientTypes {
  type User = ExternalModules.Supabase.User;
  type Profile = typeof Database.public.Tables.profile.Row;
  type Address = typeof Database.public.Tables.address.Row;

  type Client = Pick<Profile, 'name' | 'email' | 'phone' | 'id'> & {
    products: (Pick<Product, 'title' | 'id' | 'created_at'> & {
      subscribed_at: string;
    })[];
    mentors: TeamMemberClient[];
    hasActivety: boolean;
  };

  type Lead = typeof Database.public.Tables.lead_approval.Row;

  namespace Get {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: any;
    }

    type Response = {
      error: string;
    };
  }
}
