const Database: ExternalModules.Supabase.Database;

declare namespace UserClient {
  type User = ExternalModules.Supabase.User;
  type Profile = typeof Database.public.Tables.profile.Row;
}
