const Database: ExternalModules.Supabase.Database;

declare namespace MentorTools {
  type Tool = typeof Database.public.Tables.mentor_tool.Row;

  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: any;
    }

    type Response = {
      error: string;
    };
  }

  namespace Get {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: any;
    }

    type Response = {
      error: string;
    };
  }
}
