const Database: ExternalModules.Supabase.Database;

declare namespace TeamTypes {
  type Team = typeof Database.public.Tables.team.Row;
  type TeamMember = typeof Database.public.Tables.team_member.Row;
  type TeamClient = typeof Database.public.Tables.team_member_client.Row;

  type TeamTree = {
    team_member: (TeamMember & {
      team_member_client: TeamClient[];
      profile: UserTypes.Profile;
    })[];
  } & Team;

  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: any;
    }

    type Response = any;

    type ClientsResponse = any;
  }
}
