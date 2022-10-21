const Database: ExternalModules.Supabase.Database;

declare namespace MemberAreaTypes {
  type Subscription = typeof Database.public.Tables.client_product.Row;
  type Address = typeof Database.public.Tables.address.Row;
  type MemberArea = {
    id: string;
    title: string;
    status: boolean;
    member_area: {
      id: string;
    }[];
    clients: number;
  };

  type Type = {
    id: string;
    name: string;
  };

  type Tool = typeof Database.public.Tables.mentor_tool.Row;
  type UserInput = typeof Database.public.Tables.client_input_tool.Row;

  type DataUserInput = UserInput & { delete? };
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: any;
    }

    type Response = UserInput[];
  }
}
