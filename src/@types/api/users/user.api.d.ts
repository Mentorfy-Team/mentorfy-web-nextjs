declare namespace UsersApi {
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: {
        user: {
          email: string;
          password: string;
          phone?: string;
          name: string;
          role: string;
          plan: string;
          session?: any;
          event?: string;
          active: boolean;
          document: string;
        };
        refeerer?: string;
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
