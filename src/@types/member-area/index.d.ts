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
    id: string | number;
    name: string;
    path: string;
  };

  type Tool = typeof Database.public.Tables.type.Row;
  type UserInput<Data = any, Extra = any> = Omit<
    typeof Database.public.Tables.client_input_tool.Row,
    'data' | 'extra'
  > & {
    data: Data;
    extra: Extra;
  };

  type DataUserInput = UserInput & { delete? };
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: any;
    }

    type Response = UserInput[];
  }
}
