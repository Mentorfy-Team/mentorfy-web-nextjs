import { DnDObject, DnDRow } from '~/components/modules/DragNDrop';

const Database: ExternalModules.Supabase.Database;

declare namespace ProductTypes {
  type Product = typeof Database.public.Tables.product.Row & {
    extra: any;
  };
  type Address = typeof Database.public.Tables.address.Row;

  type resultJorney = Omit<DnDObject, 'rows'> & {
    currentClients: ClientJorney[];
    rows: (DnDRow & {
      clients: ClientJorney[];
      progress: number;
    })[];
  };

  type ClientJorney = {
    clients: Client[];
    tools: MentorTools.ToolData[];
    result: resultJorney[];
  };

  type Client = typeof Database.public.Tables.profile.Row & {
    since: string;
    progress: number;
    inputs: typeof Database.public.Tables.client_input_tool.Row[];
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
