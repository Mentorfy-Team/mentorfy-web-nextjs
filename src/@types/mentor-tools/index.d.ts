const Database: ExternalModules.Supabase.Database;

declare namespace MentorTools {
  type ToolType = typeof Database.public.Tables.mentor_tool.Row;
  type ToolData = Partial<
    typeof Database.public.Tables.member_area_tool.Row
  > & {
    delete?: boolean;
    rows?: ToolData[];
    parent_tool?: ToolData;
  };

  type QuestionsFormProps = {
    questions: string[];
    title: string;
    description: string;
    refId: number;
  };

  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: {
        data: ToolData[];
        id: string;
      };
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
