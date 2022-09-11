declare namespace UsersApi {
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: {
        email: string;
        password: string;
        name: string;
        role: string;
        plan: string;
      };
    }

    type Result = {};

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
