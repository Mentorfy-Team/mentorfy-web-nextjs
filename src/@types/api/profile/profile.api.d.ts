declare namespace ProfileApi {
  namespace Get {
    interface Request {
      query: {
        withAddress?: boolean;
        id?: string;
      };
    }
    interface Response {
      profile?: ExternalModules.Supabase.Database.public.Tables.profile.Row;
      address?: ExternalModules.Supabase.Database.public.Tables.address.Row;
      user?: UserClient.User;
      error?: string;
    }
  }
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: {
        profile: UserClient.Profile;
        user: UserClient.User;
        address: UserClient.Address;
        avatar?: {
          file: string;
          type: string;
        };
        old_avatar?: string;
      };
    }

    type Response = {
      error?: string;
    };
  }
}
