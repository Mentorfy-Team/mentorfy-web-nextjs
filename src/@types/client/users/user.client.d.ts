const Database: ExternalModules.Supabase.Database;

declare namespace UserClient {
  type User = ExternalModules.Supabase.User;
  type Profile = typeof Database.public.Tables.profile.Row;
  type Address = typeof Database.public.Tables.address.Row;

  type SignUp = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    policies: boolean;
  };
}
