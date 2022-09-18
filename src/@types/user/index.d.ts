const Database: ExternalModules.Supabase.Database;

declare namespace UserTypes {
  type User = ExternalModules.Supabase.User;
  type Profile = typeof Database.public.Tables.profile.Row;
  type Address = typeof Database.public.Tables.address.Row;
  type ProfileWithAddress = {
    profile: Profile;
    address: Address;
  };

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
