declare namespace UsersApi {
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: {
        email: string;
        password: string;
      };
    }

    type Result = {};

    type Response = {
      user?: ExternalModules.Supabase.User;
      session?: ExternalModules.Supabase.Session;
      error: string;
    };
  }
}
