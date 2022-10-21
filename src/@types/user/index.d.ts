const Database: ExternalModules.Supabase.Database;

declare namespace UserTypes {
  type User = ExternalModules.Supabase.User;
  type Profile = typeof Database.public.Tables.profile.Row;
  type Address = typeof Database.public.Tables.address.Row;
  type ProfileWithAddress = {
    profile: Profile;
    address?: Address;
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

declare namespace MentorComponents {}

declare namespace MentoredComponents {
  type Props<ToolData = any, InputData = any, InputExtra = any> = {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: { data: ToolData; title: string; description: string };
    onChange: any;
    userInput: MemberAreaTypes.UserInput<InputData, InputExtra>;
  };
}
