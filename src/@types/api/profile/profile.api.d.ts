declare namespace ProfileApi {
  namespace Post {
    interface Request extends ExternalModules.Next.NextApiRequest {
      body: {
        profile: UserClient.Profile;
        user: UserClient.User;
        address: UserClient.Address;
      };
    }

    type Response = {
      error?: string;
    };
  }
}
