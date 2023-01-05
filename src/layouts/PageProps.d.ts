declare namespace PageTypes {
  export type Props = {
    profile: UserClient.Profile;
    address: UserClient.Address;
    user: UserClient.User;
    access_token: string;
    readonly: boolean;
    accesses: UserTypes.AccessType[];
  };
}
