const Database: ExternalModules.Supabase.Database;

declare namespace ProductTypes {
  type Product = Omit<
    typeof Database.public.Tables.product.Row,
    'member_area'
  > & {
    extra: any;
    progress?: number;
    relation?: typeof Database.public.Tables.client_product.Row;
    member_area?: typeof Database.public.Tables.member_area.Row & {
      member_area_type: typeof Database.public.Tables.member_area_type.Row;
    };
    profile?: typeof Database.public.Tables.profile.Row;
    certificate?: CertificateBuilder;
  };
  type Address = typeof Database.public.Tables.address.Row;

  type resultJorney = Omit<GroupTools, 'rows'> & {
    currentClients: ClientJorney[];
    rows: (MentorTools.ToolData & {
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

  type Certificate = {
    product_id?: string;
    default_certificate?: string;
    title?: string;
    url?: string;
    student?: {
      name?: {
        text?: string;
        pageX?: string;
        pageY?: string;
        boxSize?: number;
        fontSize?: number;
      };
      document?: {
        text?: string;
        pageX?: string;
        pageY?: string;
        boxSize?: number;
        fontSize?: number;
      };
      finishedAt?: {
        text?: string;
        pageX?: string;
        pageY?: string;
        boxSize?: number;
        fontSize?: number;
      };
    };
    course?: {
      name?: {
        text?: string;
        pageX?: string;
        pageY?: string;
        boxSize?: number;
        fontSize?: number;
      };
      owner?: {
        text?: string;
        pageX?: string;
        pageY?: string;
        boxSize?: number;
        fontSize?: number;
      };
    };
  };

  type CertificateBuilder = {
    product_id: string;
    title: string;
    url: string;
    student: {
      name: {
        pageX: string;
        pageY: string;
        fontSize: number;
      };
      finishedAt: {
        pageX: string;
        pageY: string;
        fontSize: number;
      };
      document: {
        pageX: string;
        pageY: string;
        fontSize: number;
      };
    };
    course: {
      name: {
        pageX: string;
        pageY: string;
        fontSize: number;
      };
      owner: {
        pageX: string;
        pageY: string;
        fontSize: number;
      };
    };
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
