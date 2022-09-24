declare namespace AuthApi {
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: {
        email?: string;
        password?: string;
        access_token?: string;
      };
    }

    type Result = any;

    type User = ExternalModules.Supabase.Database.User &
      ExternalModules.Supabase.Database.public.Tables.profile.Row;

    type Response = {
      user?: User;
      session?: ExternalModules.Supabase.Session & {
        user: User;
      };
      error: string;
    };
  }
}
