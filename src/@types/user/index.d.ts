const Database: ExternalModules.Supabase.Database;

declare namespace UserTypes {
  type User = ExternalModules.Supabase.User;
  type Profile = typeof Database.public.Tables.profile.Row & {
    customer?: PagarmeCustomer;
  };
  type Address = typeof Database.public.Tables.address.Row;
  type ProfileWithAddress = {
    profile: Profile;
    address?: Address;
  };

  type PagarmeCustomer = [{
    object: string;
    id: number;
    external_id: string;
    type: string;
    country: string;
    document_number: string;
    document_type: string;
    name: string;
    email: string;
    phone_numbers: string[];
    born_at: string;
    birthday: string;
    gender: string;
    date_created: string;
    documents: {
      object?: string;
      id?: string;
      type: string;
      number: string;
    }[];
    addresses: string[];
    phones: string[];
  }];

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

declare namespace MentorComponents { }

declare namespace MentoredComponents {
  type Props<
    ToolData = any,
    InputData = any,
    InputExtra = any,
    ToolExtra = any,
  > = {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: {
      data: ToolData;
      title: string;
      description: string;
      extra?: ToolExtra;
    };
    onChange: any;
    userInput: MemberAreaTypes.UserInput<InputData, InputExtra>;
  };
}
